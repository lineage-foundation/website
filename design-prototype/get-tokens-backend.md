# Get-tokens — backend contract

`get-tokens.html` is the **front-end only**. It enforces limits, validates input, and
shows every state, but it cannot take money or move tokens on its own. Two server
endpoints make it live. All business values (cap, currency, rate, faucet amount,
cooldown) live in the `CONFIG` block of the inline script in `get-tokens.html` — keep
the server values in sync, with the **server as the source of truth** (never trust the
client cap).

---

## 1. Buy LNGX — Stripe Checkout

### `POST /api/checkout/session`
Create a Stripe Checkout Session and return its URL for redirect.

**Request**
```json
{ "amount": 25, "currency": "USD", "address": "<lineage-address>" }
```

**Server must**
- Re-validate `amount` against `MIN_PURCHASE` and `MAX_PURCHASE` **server-side**
  (the client cap is a convenience, not a control).
- Re-validate the Lineage `address` format.
- Create a Stripe Checkout Session (`mode: payment`), storing `address` and the
  quoted LNGX amount in session `metadata`.
- Return `{ "url": "https://checkout.stripe.com/..." }`; the client redirects.

**Response**
```json
{ "url": "https://checkout.stripe.com/c/pay/cs_test_..." }
```

### `POST /api/checkout/webhook`
Stripe → server. The **only** place a purchase is fulfilled.

- Verify the Stripe signature (`stripe-signature` header) before doing anything.
- On `checkout.session.completed`, read `metadata.address` + LNGX amount and
  dispense from the treasury wallet. Make dispensing **idempotent** on the Stripe
  event id so retries never double-pay.

---

## 2. Developer faucet

### `POST /api/faucet/claim`
```json
{ "address": "<lineage-address>" }
```

**Server must**
- Validate the address format.
- Enforce the cooldown **server-side**, keyed by address (and ideally client IP):
  reject with `429` + `retryAfterMs` if still cooling down. The client's
  `localStorage` countdown is UX only — it is trivially bypassed.
- Sign + broadcast `FAUCET_AMOUNT` test LNGX from the faucet wallet, then return the
  tx hash.

**Response**
```json
{ "txHash": "0x...", "amount": 10 }
```
**On cooldown**
```json
{ "error": "cooldown", "retryAfterMs": 53400000 }
```

---

## Configuration / env

| Value | Where | Notes |
|---|---|---|
| `MAX_PURCHASE` | server + client CONFIG | **Set by compliance.** The KYC-threshold cap. |
| `MIN_PURCHASE`, `LNGX_PER_UNIT`, `CURRENCY` | server + client CONFIG | Rate should ideally be quoted server-side at session-create time. |
| `FAUCET_AMOUNT`, `COOLDOWN_HOURS` | server + client CONFIG | Server is authoritative. |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | server env | Never ship to the client. |
| Treasury + faucet wallet keys | server env / KMS | See security below. |

## Security & compliance must-haves

- **Server-side caps.** Re-check `MIN`/`MAX` and cooldown on the server; the client is UX.
- **Webhook signatures.** Fulfil purchases only from a signature-verified Stripe webhook, never from the client.
- **Idempotency.** Key dispensing on the Stripe event id (buy) and enforce one-claim-per-window (faucet).
- **Wallet isolation.** The faucet hot wallet holds only test funds; the purchase-treasury wallet is separate, rate-limited, and ideally behind a KMS/HSM signer.
- **Rate limiting & abuse.** Per-IP + per-address limits on the faucet; basic bot defence (e.g. proof-of-work or captcha) before it is public.
- **KYC/AML is a legal decision, not a UI cap.** A per-purchase ceiling does **not** by itself create a regulatory exemption. Confirm thresholds, per-wallet aggregation over time, and that the payment processor's terms permit these sales with compliance/legal **before** going live.
- **Token classification.** Keep messaging on "utility top-up, not investment" consistent with how the offering is structured and disclosed.
