/**
 * Hand-written request/response examples for the highest-traffic endpoints, layered on top
 * of the generated schema tables. Keyed by `"<METHOD> <path>"`. Responses are real (trimmed)
 * payloads from the live testnet, so they show the actual field shapes a client will see.
 *
 * Only key endpoints are curated; the rest fall back to their generated schema. When an
 * endpoint's shape changes, update the matching entry here.
 */

export interface ApiExample {
  curl: string;
  response: string;
}

export const EXAMPLES: Record<string, ApiExample> = {
  "GET /v1/blocks/latest": {
    curl: `curl -sS "https://storage.lineage.to/v1/blocks/latest"`,
    response: `{
  "block": {
    "block": {
      "header": {
        "b_num": 5373,
        "previous_hash": "b004f3a8a053ed469b77b7afc3060714fe7edc188d5f70e7f7fdf8813db32d42e",
        "difficulty": [34, 0, 0, 1],
        "nonce_and_mining_tx_hash": [[45, 0, 0, 0], "g08bf5101e59b01ef9300b8f9311f226"],
        "seed_value": [49, 52, 57, 55, "… truncated …"]
      },
      "transactions": ["g08bf5101e59b01ef9300b8f9311f226"]
    }
  }
}`,
  },

  "GET /v1/balances": {
    curl: `# Repeat ?address= for each address you want
curl -sS "https://mempool.lineage.to/v1/balances?address=<address>"`,
    response: `{
  "balance": {
    "address_list": {
      "<address>": [
        {
          "out_point": { "n": 0, "t_hash": "g59cbf95982cff737ba0b067ff6d467d" },
          "value": { "Token": 720720000 }
        }
      ]
    },
    "total": { "tokens": 720720000, "items": {} }
  }
}`,
  },

  "GET /v1/supply": {
    curl: `curl -sS "https://mempool.lineage.to/v1/supply"`,
    response: `{
  "total": 360360000000000000,
  "issued": 90103919694881008
}`,
  },

  "POST /v1/payments": {
    curl: `# amount is in raw token units (1 LNGX = 72,072,000)
curl -sS -X POST "https://miner.lineage.to/v1/payments" \\
  -H "Content-Type: application/json" \\
  -d '{
    "kind": "address",
    "address": "<recipient-address>",
    "amount": 720720000,
    "passphrase": "<wallet-passphrase>"
  }'`,
    response: `{
  "to_address": "<recipient-address>",
  "amount": { "kind": "token", "amount": 720720000 },
  "tx_hash": "g59cbf95982cff737ba0b067ff6d467d"
}`,
  },

  "GET /v1/wallet": {
    curl: `curl -sS "https://miner.lineage.to/v1/wallet"`,
    response: `{
  "running_total": 141133.02058814795,
  "running_total_tokens": 10171739059829,
  "available_total_tokens": 9915312269729,
  "locked_total_tokens": 256426790100,
  "item_total": {},
  "addresses": {
    "0033315ca62a2ae88bada214f0308e77552f43bff4c0724b7b0b12110255cb1f": [
      {
        "out_point": { "n": 0, "t_hash": "g3cf6b82adceece76bb8f3f62dba5e61" },
        "value": { "Token": 2590174402 }
      }
    ]
  }
}`,
  },
};

/** Look up a curated example for an operation, if one exists. */
export function exampleFor(method: string, path: string): ApiExample | undefined {
  return EXAMPLES[`${method.toUpperCase()} ${path}`];
}
