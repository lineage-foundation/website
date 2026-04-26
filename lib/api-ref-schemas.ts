/**
 * Authoritative example JSON for public Lineage node HTTP API docs.
 * Shapes follow the UTXO-style mempool contract used in the reference network
 * (inputs with Pay2PkH, outputs with value + script). Align field-level details
 * with the node and wallet version you run before mainnet use.
 */

/** Same pattern as typical `400` responses across mempool and storage routes. */
export const ENVELOPE_ERROR_EXAMPLE = `{
  "id": null,
  "status": "Error",
  "reason": "Bad Request",
  "route": null,
  "content": null
}`;

export const CREATE_TRANSACTIONS_REQUEST = `{
  "inputs": [
    {
      "previous_out": {
        "t_hash": "<32-byte-hex-tx-id-of-utxo-spent>",
        "n": 0
      },
      "script_signature": {
        "Pay2PkH": {
          "signable_data": "<hex: digest the node asks you to sign (e.g. outputs + previous out)>",
          "signature": "<hex>",
          "public_key": "<hex>",
          "address_version": "<e.g. network byte / version string>"
        }
      }
    }
  ],
  "outputs": [
    {
      "value": { "Token": 1000 },
      "locktime": 0,
      "script_public_key": "<recipient locking script / key hash encoding>"
    }
  ],
  "version": 1,
  "druid_info": {
    "druid": "<coordination id for 2-of-n or DEX-style flows, or empty string>",
    "participants": 2,
    "expectations": {
      "from": "<address>",
      "to": "<address>",
      "asset": {}
    }
  }
}`;

/**
 * Two-party and simple sends often omit `druid_info` entirely. Prefer your SDK
 * until you are sure the wire form your binary expects.
 */
export const CREATE_TRANSACTIONS_REQUEST_NO_DRUID = `{
  "inputs": [
    {
      "previous_out": { "t_hash": "<utxo-tx-hex>", "n": 0 },
      "script_signature": {
        "Pay2PkH": {
          "signable_data": "<hex>",
          "signature": "<hex>",
          "public_key": "<hex>",
          "address_version": "<string>"
        }
      }
    }
  ],
  "outputs": [
    {
      "value": { "Token": 1000 },
      "locktime": 0,
      "script_public_key": "<script>"
    }
  ],
  "version": 1
}`;

export const CREATE_TRANSACTIONS_SUCCESS = `{
  "id": "a1d46199e5c89b00509e118f5af83172",
  "status": "Success",
  "reason": "Transaction/s successfully created",
  "route": "create_transactions",
  "content": {
    "transaction": {
      "tx_hash": "<32-byte-hex of accepted tx>",
      "hex": "<optional raw tx hex if your build returns it>"
    }
  }
}`;

export const CREATE_ITEM_ASSET_REQUEST = `{
  "item_amount": 1,
  "script_public_key": "<receiving or controlling lock / address encoding>",
  "public_key": "<hex>",
  "signature": "<hex>",
  "drs_tx_hash_spec": "default"
}`;

export const CREATE_ITEM_ASSET_SUCCESS = `{
  "id": "0123456789abcdef0123456789abcdef",
  "status": "Success",
  "reason": "Item asset created",
  "route": "create_item_asset",
  "content": {
    "item_amount": 1,
    "tx_hash": "<32-byte-hex transaction id>",
    "metadata": {}
  }
}`;

export const FETCH_BALANCE_SUCCESS = `{
  "id": "0123456789abcdef0123456789abcdef",
  "status": "Success",
  "reason": "Balances returned",
  "route": "fetch_balance",
  "content": {
    "balances": [
      {
        "address": "<address>",
        "assets": [
          { "name": "Token", "value": 1000 },
          { "name": "Item", "value": 0, "id": null }
        ]
      }
    ]
  }
}`;

export const LATEST_BLOCK_SUCCESS = `{
  "id": "0123456789abcdef0123456789abcdef",
  "status": "Success",
  "reason": "Latest block",
  "route": "latest_block",
  "content": {
    "height": 12345,
    "block_hash": "<32-byte-hex header hash>",
    "prev_block": "<hex or null for genesis parent>",
    "merkle": "<root hex>",
    "tx_ids": [ "<tx-id-1>", "<tx-id-2>" ],
    "header": {}
  }
}`;

export const BLOCK_BY_NUM_SUCCESS = `{
  "id": "0123456789abcdef0123456789abcdef",
  "status": "Success",
  "reason": "Blocks returned",
  "route": "block_by_num",
  "content": {
    "blocks": [
      {
        "height": 0,
        "block_hash": "<hex>",
        "tx_ids": [ "<tx-id>" ],
        "header": {}
      }
    ]
  }
}`;

export const BLOCKCHAIN_ENTRY_BLOCK = `{
  "id": "0123456789abcdef0123456789abcdef",
  "status": "Success",
  "reason": "Entry found",
  "route": "blockchain_entry",
  "content": {
    "type": "block",
    "height": 100,
    "block_hash": "<hex>",
    "tx_ids": [ "<tx-id>" ],
    "header": {}
  }
}`;

export const BLOCKCHAIN_ENTRY_TX = `{
  "id": "0123456789abcdef0123456789abcdef",
  "status": "Success",
  "reason": "Entry found",
  "route": "blockchain_entry",
  "content": {
    "type": "transaction",
    "tx_hash": "<hex>",
    "inputs": [
      { "previous_out": { "t_hash": "<hex>", "n": 0 }, "script_signature": {} }
    ],
    "outputs": [
      { "value": { "Token": 0 }, "locktime": 0, "script_public_key": "<script>" }
    ],
    "version": 1
  }
}`;

export const ISSUED_SUPPLY_SUCCESS = `{
  "id": "0123456789abcdef0123456789abcdef",
  "status": "Success",
  "reason": "Supply returned",
  "route": "issued_supply",
  "content": 0
}`;

export const TOTAL_SUPPLY_SUCCESS = `{
  "id": "0123456789abcdef0123456789abcdef",
  "status": "Success",
  "reason": "Supply returned",
  "route": "total_supply",
  "content": 0
}`;
