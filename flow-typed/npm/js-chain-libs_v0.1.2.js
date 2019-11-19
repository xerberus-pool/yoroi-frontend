// @flow

/* eslint-disable camelcase */

/**
 * Flowtype definitions for js_chain_libs
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.10.0
 */
declare module 'js-chain-libs' { // need to wrap flowgen output into module

  /**
   * @param {any} input
   * @returns {string}
   */
  declare export function uint8array_to_hex(input: any): string;

  declare export var AddressDiscrimination: {|
    +Production: 0, // 0
    +Test: 1 // 1
  |};
  declare export type AddressDiscriminationType = $Values<typeof AddressDiscrimination>;

  declare export var AddressKind: {|
    +Single: 0, // 0
    +Group: 1, // 1
    +Account: 2, // 2
    +Multisig: 3 // 3
  |};
  declare export type AddressKindType = $Values<typeof AddressKind>;

  /**
   * Allow to differentiate between address in
   * production and testing setting, so that
   * one type of address is not used in another setting.
   * Example
   * ```javascript
   * let discriminant = AddressDiscrimination.Test;
   * let address = Address::single_from_public_key(public_key, discriminant);
   * ```
   */
  /**
   * This is either an single account or a multisig account depending on the witness type
   */
  declare export class Account {
    free(): void;

    /**
     * @param {Address} address
     * @returns {Account}
     */
    static from_address(address: Address): Account;

    /**
     * @param {number} discriminant
     * @returns {Address}
     */
    to_address(discriminant: number): Address;

    /**
     * @param {PublicKey} key
     * @returns {Account}
     */
    static from_public_key(key: PublicKey): Account;

    /**
     * @returns {AccountIdentifier}
     */
    to_identifier(): AccountIdentifier;
  }
  /**
   */
  declare export class AccountAddress {
    free(): void;

    /**
     * @returns {PublicKey}
     */
    get_account_key(): PublicKey;

    /**
     * @returns {Address}
     */
    to_base_address(): Address;
  }
  /**
   */
  declare export class AccountIdentifier {
    free(): void;

    /**
     * @returns {string}
     */
    to_hex(): string;
  }
  /**
   */
  declare export class AccountWitness {
    free(): void;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @returns {string}
     */
    to_bech32(): string;

    /**
     * @returns {string}
     */
    to_hex(): string;

    /**
     * @param {Uint8Array} bytes
     * @returns {AccountWitness}
     */
    static from_bytes(bytes: Uint8Array): AccountWitness;

    /**
     * @param {string} bech32_str
     * @returns {AccountWitness}
     */
    static from_bech32(bech32_str: string): AccountWitness;

    /**
     * @param {string} input
     * @returns {AccountWitness}
     */
    static from_hex(input: string): AccountWitness;
  }
  /**
   * An address of any type, this can be one of
   * * A utxo-based address without delegation (single)
   * * A utxo-based address with delegation (group)
   * * An address for an account
   */
  declare export class Address {
    free(): void;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @param {Uint8Array} bytes
     * @returns {Address}
     */
    static from_bytes(bytes: Uint8Array): Address;

    /**
     * Construct Address from its bech32 representation
     * Example
     * ```javascript
     * const address = Address.from_string(&#39;ca1q09u0nxmnfg7af8ycuygx57p5xgzmnmgtaeer9xun7hly6mlgt3pjyknplu&#39;);
     * ```
     * @param {string} s
     * @returns {Address}
     */
    static from_string(s: string): Address;

    /**
     * Get Address bech32 (string) representation with a given prefix
     * ```javascript
     * let public_key = PublicKey.from_bech32(
     *      &#39;ed25519_pk1kj8yvfrh5tg7n62kdcw3kw6zvtcafgckz4z9s6vc608pzt7exzys4s9gs8&#39;
     * );
     * let discriminant = AddressDiscrimination.Test;
     * let address = Address.single_from_public_key(public_key, discriminant);
     * address.to_string(&#39;ta&#39;)
     * // ta1sj6gu33yw73dr60f2ehp6xemgf30r49rzc25gkrfnrfuuyf0mycgnj78ende550w5njvwzyr20q6rypdea597uu3jnwfltljddl59cseaq7yn9
     * ```
     * @param {string} prefix
     * @returns {string}
     */
    to_string(prefix: string): string;

    /**
     * Construct a single non-account address from a public key
     * ```javascript
     * let public_key = PublicKey.from_bech32(
     *      &#39;ed25519_pk1kj8yvfrh5tg7n62kdcw3kw6zvtcafgckz4z9s6vc608pzt7exzys4s9gs8&#39;
     * );
     * let address = Address.single_from_public_key(public_key, AddressDiscrimination.Test);
     * ```
     * @param {PublicKey} key
     * @param {AddressDiscriminationType} discrimination
     * @returns {Address}
     */
    static single_from_public_key(
      key: PublicKey,
      discrimination: AddressDiscriminationType,
    ): Address;

    /**
     * Construct a non-account address from a pair of public keys, delegating founds from the first to the second
     * @param {PublicKey} key
     * @param {PublicKey} delegation
     * @param {AddressDiscriminationType} discrimination
     * @returns {Address}
     */
    static delegation_from_public_key(
      key: PublicKey,
      delegation: PublicKey,
      discrimination: AddressDiscriminationType,
    ): Address;

    /**
     * Construct address of account type from a public key
     * @param {PublicKey} key
     * @param {AddressDiscriminationType} discrimination
     * @returns {Address}
     */
    static account_from_public_key(
      key: PublicKey,
      discrimination: AddressDiscriminationType,
    ): Address;

    /**
     * @param {Uint8Array} merkle_root
     * @param {AddressDiscriminationType} discrimination
     * @returns {Address}
     */
    static multisig_from_merkle_root(
      merkle_root: Uint8Array,
      discrimination: AddressDiscriminationType,
    ): Address;

    /**
     * @returns {AddressDiscriminationType}
     */
    get_discrimination(): AddressDiscriminationType;

    /**
     * @returns {AddressKindType}
     */
    get_kind(): AddressKindType;

    /**
     * @returns {SingleAddress}
     */
    to_single_address(): SingleAddress | void;

    /**
     * @returns {GroupAddress}
     */
    to_group_address(): GroupAddress | void;

    /**
     * @returns {AccountAddress}
     */
    to_account_address(): AccountAddress | void;

    /**
     * @returns {MultisigAddress}
     */
    to_multisig_address(): MultisigAddress | void;
  }
  /**
   * Type for representing a Transaction with Witnesses (signatures)
   */
  declare export class AuthenticatedTransaction {
    free(): void;

    /**
     * Get a copy of the inner Transaction, discarding the signatures
     * @returns {Transaction}
     */
    transaction(): Transaction;

    /**
     * @returns {Witnesses}
     */
    witnesses(): Witnesses;
  }
  /**
   * Amount of the balance in the transaction.
   */
  declare export class Balance {
    free(): void;

    /**
     * @returns {'positive' | 'negative' | 'zero'}
     */
    get_sign(): 'positive' | 'negative' | 'zero';

    /**
     * @returns {boolean}
     */
    is_positive(): boolean;

    /**
     * @returns {boolean}
     */
    is_negative(): boolean;

    /**
     * @returns {boolean}
     */
    is_zero(): boolean;

    /**
     * Get value without taking into account if the balance is positive or negative
     * @returns {Value}
     */
    get_value(): Value;
  }
  /**
   */
  declare export class Bip32PrivateKey {
    free(): void;

    /**
     * derive this private key with the given index.
     *
     * # Security considerations
     *
     * * hard derivation index cannot be soft derived with the public key
     *
     * # Hard derivation vs Soft derivation
     *
     * If you pass an index below 0x80000000 then it is a soft derivation.
     * The advantage of soft derivation is that it is possible to derive the
     * public key too. I.e. derivation the private key with a soft derivation
     * index and then retrieving the associated public key is equivalent to
     * deriving the public key associated to the parent private key.
     *
     * Hard derivation index does not allow public key derivation.
     *
     * This is why deriving the private key should not fail while deriving
     * the public key may fail (if the derivation index is invalid).
     * @param {number} index
     * @returns {Bip32PrivateKey}
     */
    derive(index: number): Bip32PrivateKey;

    /**
     * @returns {Bip32PrivateKey}
     */
    static generate_ed25519_bip32(): Bip32PrivateKey;

    /**
     * @returns {PrivateKey}
     */
    to_raw_key(): PrivateKey;

    /**
     * @returns {Bip32PublicKey}
     */
    to_public(): Bip32PublicKey;

    /**
     * @param {Uint8Array} bytes
     * @returns {Bip32PrivateKey}
     */
    static from_bytes(bytes: Uint8Array): Bip32PrivateKey;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @param {string} bech32_str
     * @returns {Bip32PrivateKey}
     */
    static from_bech32(bech32_str: string): Bip32PrivateKey;

    /**
     * @returns {string}
     */
    to_bech32(): string;

    /**
     * @param {Uint8Array} entropy
     * @param {Uint8Array} password
     * @returns {Bip32PrivateKey}
     */
    static from_bip39_entropy(entropy: Uint8Array, password: Uint8Array): Bip32PrivateKey;
  }
  /**
   */
  declare export class Bip32PublicKey {
    free(): void;

    /**
     * derive this public key with the given index.
     *
     * # Errors
     *
     * If the index is not a soft derivation index (< 0x80000000) then
     * calling this method will fail.
     *
     * # Security considerations
     *
     * * hard derivation index cannot be soft derived with the public key
     *
     * # Hard derivation vs Soft derivation
     *
     * If you pass an index below 0x80000000 then it is a soft derivation.
     * The advantage of soft derivation is that it is possible to derive the
     * public key too. I.e. derivation the private key with a soft derivation
     * index and then retrieving the associated public key is equivalent to
     * deriving the public key associated to the parent private key.
     *
     * Hard derivation index does not allow public key derivation.
     *
     * This is why deriving the private key should not fail while deriving
     * the public key may fail (if the derivation index is invalid).
     * @param {number} index
     * @returns {Bip32PublicKey}
     */
    derive(index: number): Bip32PublicKey;

    /**
     * @returns {PublicKey}
     */
    to_raw_key(): PublicKey;

    /**
     * @param {Uint8Array} bytes
     * @returns {Bip32PublicKey}
     */
    static from_bytes(bytes: Uint8Array): Bip32PublicKey;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @param {string} bech32_str
     * @returns {Bip32PublicKey}
     */
    static from_bech32(bech32_str: string): Bip32PublicKey;

    /**
     * @returns {string}
     */
    to_bech32(): string;
  }
  /**
   * `Block` is an element of the blockchain it contains multiple
   * transaction and a reference to the parent block. Alongside
   * with the position of that block in the chain.
   */
  declare export class Block {
    free(): void;

    /**
     * Deserialize a block from a byte array
     * @param {Uint8Array} bytes
     * @returns {Block}
     */
    static from_bytes(bytes: Uint8Array): Block;

    /**
     * @returns {BlockId}
     */
    id(): BlockId;

    /**
     * @returns {BlockId}
     */
    parent_id(): BlockId;

    /**
     * This involves copying all the fragments
     * @returns {Fragments}
     */
    fragments(): Fragments;
  }
  /**
   */
  declare export class BlockId {
    free(): void;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;
  }
  /**
   */
  declare export class Certificate {
    free(): void;

    /**
     * Create a Certificate for StakeDelegation
     * @param {StakeDelegation} stake_delegation
     * @returns {Certificate}
     */
    static stake_delegation(stake_delegation: StakeDelegation): Certificate;

    /**
     * Create a Certificate for PoolRegistration
     * @param {PoolRegistration} pool_registration
     * @returns {Certificate}
     */
    static stake_pool_registration(
      pool_registration: PoolRegistration
    ): Certificate;

    /**
     * @param {PrivateKey} private_key
     */
    sign(private_key: PrivateKey): void;
  }
  /**
   */
  declare export class Ed25519Signature {
    free(): void;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @returns {string}
     */
    to_bech32(): string;

    /**
     * @returns {string}
     */
    to_hex(): string;

    /**
     * @param {Uint8Array} bytes
     * @returns {Ed25519Signature}
     */
    static from_bytes(bytes: Uint8Array): Ed25519Signature;

    /**
     * @param {string} bech32_str
     * @returns {Ed25519Signature}
     */
    static from_bech32(bech32_str: string): Ed25519Signature;

    /**
     * @param {string} input
     * @returns {Ed25519Signature}
     */
    static from_hex(input: string): Ed25519Signature;
  }
  /**
   * Algorithm used to compute transaction fees
   * Currently the only implementation if the Linear one
   */
  declare export class Fee {
    free(): void;

    /**
     * Linear algorithm, this is formed by: `coefficient * (#inputs + #outputs) + constant + certificate * #certificate
     * @param {Value} constant
     * @param {Value} coefficient
     * @param {Value} certificate
     * @returns {Fee}
     */
    static linear_fee(
      constant: Value,
      coefficient: Value,
      certificate: Value
    ): Fee;

    /**
     * Compute the fee if possible (it can fail in case the values are out of range)
     * @param {Transaction} tx
     * @returns {Value}
     */
    calculate(tx: Transaction): Value | void;
  }
  /**
   * All possible messages recordable in the Block content
   */
  declare export class Fragment {
    free(): void;

    /**
     * @param {AuthenticatedTransaction} tx
     * @returns {Fragment}
     */
    static from_authenticated_transaction(tx: AuthenticatedTransaction): Fragment;

    /**
     * Deprecated: Use `from_authenticated_transaction` instead
     * @param {AuthenticatedTransaction} tx
     * @returns {Fragment}
     */
    static from_generated_transaction(tx: AuthenticatedTransaction): Fragment;

    /**
     * Get a Transaction if the Fragment represents one
     * @returns {AuthenticatedTransaction}
     */
    get_transaction(): AuthenticatedTransaction;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @returns {boolean}
     */
    is_initial(): boolean;

    /**
     * @returns {boolean}
     */
    is_transaction(): boolean;

    /**
     * @returns {boolean}
     */
    is_owner_stake_delegation(): boolean;

    /**
     * @returns {boolean}
     */
    is_stake_delegation(): boolean;

    /**
     * @returns {boolean}
     */
    is_pool_registration(): boolean;

    /**
     * @returns {boolean}
     */
    is_pool_management(): boolean;

    /**
     * @returns {boolean}
     */
    is_old_utxo_declaration(): boolean;

    /**
     * @returns {boolean}
     */
    is_update_proposal(): boolean;

    /**
     * @returns {boolean}
     */
    is_update_vote(): boolean;

    /**
     * @returns {FragmentId}
     */
    id(): FragmentId;
  }
  /**
   */
  declare export class FragmentId {
    free(): void;

    /**
     * @param {Uint8Array} bytes
     * @returns {FragmentId}
     */
    static from_bytes(bytes: Uint8Array): FragmentId;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;
  }
  /**
   */
  declare export class Fragments {
    free(): void;

    /**
     * @returns {number}
     */
    size(): number;

    /**
     * @param {number} index
     * @returns {Fragment}
     */
    get(index: number): Fragment;
  }
  /**
   */
  declare export class GroupAddress {
    free(): void;

    /**
     * @returns {PublicKey}
     */
    get_spending_key(): PublicKey;

    /**
     * @returns {PublicKey}
     */
    get_account_key(): PublicKey;

    /**
     * @returns {Address}
     */
    to_base_address(): Address;
  }
  /**
   * Type for representing a generic Hash
   */
  declare export class Hash {
    free(): void;

    /**
     * @param {Uint8Array} bytes
     * @returns {Hash}
     */
    static from_bytes(bytes: Uint8Array): Hash;

    /**
     * @param {string} hex_string
     * @returns {Hash}
     */
    static from_hex(hex_string: string): Hash;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;
  }
  /**
   */
  declare export class Input {
    free(): void;

    /**
     * @param {UtxoPointer} utxo_pointer
     * @returns {Input}
     */
    static from_utxo(utxo_pointer: UtxoPointer): Input;

    /**
     * @param {Account} account
     * @param {Value} v
     * @returns {Input}
     */
    static from_account(account: Account, v: Value): Input;

    /**
     * Get the kind of Input, this can be either \"Account\" or \"Utxo\
     * @returns {string}
     */
    get_type(): string;

    /**
     * @returns {boolean}
     */
    is_account(): boolean;

    /**
     * @returns {boolean}
     */
    is_utxo(): boolean;

    /**
     * @returns {Value}
     */
    value(): Value;

    /**
     * Get the inner UtxoPointer if the Input type is Utxo
     * @returns {UtxoPointer}
     */
    get_utxo_pointer(): UtxoPointer;

    /**
     * Get the source Account if the Input type is Account
     * @returns {Account}
     */
    get_account(): Account;
  }
  /**
   */
  declare export class Inputs {
    free(): void;

    /**
     * @returns {number}
     */
    size(): number;

    /**
     * @param {number} index
     * @returns {Input}
     */
    get(index: number): Input;
  }
  /**
   */
  declare export class KesPublicKey {
    free(): void;

    /**
     * @param {string} bech32_str
     * @returns {KesPublicKey}
     */
    static from_bech32(bech32_str: string): KesPublicKey;
  }
  /**
   */
  declare export class MultisigAddress {
    free(): void;

    /**
     * @returns {Uint8Array}
     */
    get_merkle_root(): Uint8Array;

    /**
     * @returns {Address}
     */
    to_base_address(): Address;
  }
  /**
   * Type for representing a Transaction Output, composed of an Address and a Value
   */
  declare export class Output {
    free(): void;

    /**
     * @returns {Address}
     */
    address(): Address;

    /**
     * @returns {Value}
     */
    value(): Value;
  }
  /**
   * Helper to add change addresses when finalizing a transaction, there are currently two options
   * * forget: use all the excess money as fee
   * * one: send all the excess money to the given address
   */
  declare export class OutputPolicy {
    free(): void;

    /**
     * don\'t do anything with the excess money in transaction
     * @returns {OutputPolicy}
     */
    static forget(): OutputPolicy;

    /**
     * use the given address as the only change address
     * @param {Address} address
     * @returns {OutputPolicy}
     */
    static one(address: Address): OutputPolicy;
  }
  /**
   */
  declare export class Outputs {
    free(): void;

    /**
     * @returns {number}
     */
    size(): number;

    /**
     * @param {number} index
     * @returns {Output}
     */
    get(index: number): Output;
  }
  /**
   */
  declare export class PoolId {
    free(): void;

    /**
     * @param {string} hex_string
     * @returns {PoolId}
     */
    static from_hex(hex_string: string): PoolId;

    /**
     * @returns {string}
     */
    to_string(): string;
  }
  /**
   */
  declare export class PoolRegistration {
    free(): void;

    /**
     * @param {U128} serial
     * @param {PublicKeys} owners
     * @param {number} management_threshold
     * @param {TimeOffsetSeconds} start_validity
     * @param {KesPublicKey} kes_public_key
     * @param {VrfPublicKey} vrf_public_key
     * @returns {PoolRegistration}
     */
    constructor(
      serial: U128,
      owners: PublicKeys,
      management_threshold: number,
      start_validity: TimeOffsetSeconds,
      kes_public_key: KesPublicKey,
      vrf_public_key: VrfPublicKey
    ): this;

    /**
     * @returns {PoolId}
     */
    id(): PoolId;
  }
  /**
   * ED25519 signing key, either normal or extended
   */
  declare export class PrivateKey {
    free(): void;

    /**
     * Get private key from its bech32 representation
     * ```javascript
     * PrivateKey.from_bech32(&#39;ed25519_sk1ahfetf02qwwg4dkq7mgp4a25lx5vh9920cr5wnxmpzz9906qvm8qwvlts0&#39;);
     * ```
     * For an extended 25519 key
     * ```javascript
     * PrivateKey.from_bech32(&#39;ed25519e_sk1gqwl4szuwwh6d0yk3nsqcc6xxc3fpvjlevgwvt60df59v8zd8f8prazt8ln3lmz096ux3xvhhvm3ca9wj2yctdh3pnw0szrma07rt5gl748fp&#39;);
     * ```
     * @param {string} bech32_str
     * @returns {PrivateKey}
     */
    static from_bech32(bech32_str: string): PrivateKey;

    /**
     * @returns {PublicKey}
     */
    to_public(): PublicKey;

    /**
     * @returns {PrivateKey}
     */
    static generate_ed25519(): PrivateKey;

    /**
     * @returns {PrivateKey}
     */
    static generate_ed25519extended(): PrivateKey;

    /**
     * @returns {string}
     */
    to_bech32(): string;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @param {Uint8Array} bytes
     * @returns {PrivateKey}
     */
    static from_extended_bytes(bytes: Uint8Array): PrivateKey;

    /**
     * @param {Uint8Array} bytes
     * @returns {PrivateKey}
     */
    static from_normal_bytes(bytes: Uint8Array): PrivateKey;

    /**
     * @param {Uint8Array} message
     * @returns {Ed25519Signature}
     */
    sign(message: Uint8Array): Ed25519Signature;
  }
  /**
   * ED25519 key used as public key
   */
  declare export class PublicKey {
    free(): void;

    /**
     * Get private key from its bech32 representation
     * Example:
     * ```javascript
     * const pkey = PublicKey.from_bech32(&#39;ed25519_pk1dgaagyh470y66p899txcl3r0jaeaxu6yd7z2dxyk55qcycdml8gszkxze2&#39;);
     * ```
     * @param {string} bech32_str
     * @returns {PublicKey}
     */
    static from_bech32(bech32_str: string): PublicKey;

    /**
     * @returns {string}
     */
    to_bech32(): string;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @param {Uint8Array} bytes
     * @returns {PublicKey}
     */
    static from_bytes(bytes: Uint8Array): PublicKey;

    /**
     * @param {Uint8Array} data
     * @param {Ed25519Signature} signature
     * @returns {boolean}
     */
    verify(data: Uint8Array, signature: Ed25519Signature): boolean;
  }
  /**
   */
  declare export class PublicKeys {
    free(): void;

    /**
     * @returns {PublicKeys}
     */
    constructor(): this;

    /**
     * @returns {number}
     */
    size(): number;

    /**
     * @param {number} index
     * @returns {PublicKey}
     */
    get(index: number): PublicKey;

    /**
     * @param {PublicKey} key
     */
    add(key: PublicKey): void;
  }
  /**
   */
  declare export class SingleAddress {
    free(): void;

    /**
     * @returns {PublicKey}
     */
    get_spending_key(): PublicKey;

    /**
     * @returns {Address}
     */
    to_base_address(): Address;
  }
  /**
   */
  declare export class SpendingCounter {
    free(): void;

    /**
     * @returns {SpendingCounter}
     */
    static zero(): SpendingCounter;

    /**
     * @param {number} counter
     * @returns {SpendingCounter}
     */
    static from_u32(counter: number): SpendingCounter;
  }
  /**
   */
  declare export class StakeDelegation {
    free(): void;

    /**
     * Create a stake delegation object from account (stake key) to pool_id
     * @param {PoolId} pool_id
     * @param {PublicKey} account
     * @returns {StakeDelegation}
     */
    static new(pool_id: PoolId, account: PublicKey): StakeDelegation;
  }
  /**
   */
  declare export class TimeOffsetSeconds {
    free(): void;

    /**
     * Parse the given string into a 64 bits unsigned number
     * @param {string} number
     * @returns {TimeOffsetSeconds}
     */
    static from_string(number: string): TimeOffsetSeconds;
  }
  /**
   * Type representing a unsigned transaction
   */
  declare export class Transaction {
    free(): void;

    /**
     * Get the transaction id, needed to compute its signature
     * @returns {TransactionSignDataHash}
     */
    id(): TransactionSignDataHash;

    /**
     * Get collection of the inputs in the transaction (this allocates new copies of all the values)
     * @returns {Inputs}
     */
    inputs(): Inputs;

    /**
     * Get collection of the outputs in the transaction (this allocates new copies of all the values)
     * @returns {Outputs}
     */
    outputs(): Outputs;
  }
  /**
   * Builder pattern implementation for making a Transaction
   *
   * Example
   *
   * ```javascript
   * const txbuilder = new TransactionBuilder();
   *
   * const account = Account.from_address(Address.from_string(
   *    &#39;ca1qh9u0nxmnfg7af8ycuygx57p5xgzmnmgtaeer9xun7hly6mlgt3pj2xk344&#39;
   * ));
   *
   * const input = Input.from_account(account, Value.from_str(\'1000\'));
   *
   * txbuilder.add_input(input);
   *
   * txbuilder.add_output(
   *    Address.from_string(
   *      &#39;ca1q5nr5pvt9e5p009strshxndrsx5etcentslp2rwj6csm8sfk24a2w3swacn&#39;
   *    ),
   *    Value.from_str(\'500\')
   * );
   *
   * const feeAlgorithm = Fee.linear_fee(
   *    Value.from_str(\'20\'),
   *    Value.from_str(\'5\'),
   *    Value.from_str(\'0\')
   * );
   *
   * const finalizedTx = txbuilder.finalize(
   *    feeAlgorithm,
   *    OutputPolicy.one(accountInputAddress)
   * );
   * ```
   */
  declare export class TransactionBuilder {
    free(): void;

    /**
     * Deprecated. Use `new_no_payload()` instead
     * @returns {TransactionBuilder}
     */
    constructor(): this;

    /**
     * Create a TransactionBuilder for a transaction without certificate
     * @returns {TransactionBuilder}
     */
    static new_no_payload(): TransactionBuilder;

    /**
     * Create a TransactionBuilder for a transaction with certificate
     * @param {Certificate} cert
     * @returns {TransactionBuilder}
     */
    static new_payload(cert: Certificate): TransactionBuilder;

    /**
     * Add input to the transaction
     * @param {Input} input
     */
    add_input(input: Input): void;

    /**
     * Add output to the transaction
     * @param {Address} address
     * @param {Value} value
     */
    add_output(address: Address, value: Value): void;

    /**
     * Estimate fee with the currently added inputs, outputs and certificate based on the given algorithm
     * @param {Fee} fee
     * @returns {Value}
     */
    estimate_fee(fee: Fee): Value;

    /**
     * @param {Fee} fee
     * @returns {Balance}
     */
    get_balance(fee: Fee): Balance;

    /**
     * @returns {Balance}
     */
    get_balance_without_fee(): Balance;

    /**
     * Get the Transaction with the current inputs and outputs without computing the fees nor adding a change address
     * @returns {Transaction}
     */
    unchecked_finalize(): Transaction;

    /**
     * Finalize the transaction by adding the change Address output
     * leaving enough for paying the minimum fee computed by the given algorithm
     * see the unchecked_finalize for the non-assisted version
     *
     * Example
     *
     * ```javascript
     * const feeAlgorithm = Fee.linear_fee(
     *      Value.from_str(\'20\'), Value.from_str(\'5\'), Value.from_str(\'10\')
     * );
     *
     * const finalizedTx = txbuilder.finalize(
     *    feeAlgorithm,
     *    OutputPolicy.one(changeAddress)
     * );
     * ```
     * @param {Fee} fee
     * @param {OutputPolicy} output_policy
     * @returns {Transaction}
     */
    seal_with_output_policy(fee: Fee, output_policy: OutputPolicy): Transaction;

    /**
     * Deprecated: use `seal_with_output_policy` instead
     * @param {Fee} fee
     * @param {OutputPolicy} output_policy
     * @returns {Transaction}
     */
    finalize(fee: Fee, output_policy: OutputPolicy): Transaction;
  }
  /**
   * Builder pattern implementation for signing a Transaction (adding witnesses)
   * Example (for an account as input)
   *
   * ```javascript
   * //finalizedTx could be the result of the finalize method on a TransactionBuilder object
   * const finalizer = new TransactionFinalizer(finalizedTx);
   *
   * const witness = Witness.for_account(
   *    Hash.from_hex(genesisHashString),
   *    finalizer.get_txid(),
   *    inputAccountPrivateKey,
   *    SpendingCounter.zero()
   * );
   *
   * finalizer.set_witness(0, witness);
   *
   * const signedTx = finalizer.build();
   * ```
   */
  declare export class TransactionFinalizer {
    free(): void;

    /**
     * @param {Transaction} transaction
     * @returns {TransactionFinalizer}
     */
    constructor(transaction: Transaction): this;

    /**
     * Set the witness for the corresponding index, the index corresponds to the order in which the inputs were added to the transaction
     * @param {number} index
     * @param {Witness} witness
     */
    set_witness(index: number, witness: Witness): void;

    /**
     * Deprecated: Use `get_tx_sign_data_hash` instead\
     * @returns {TransactionSignDataHash}
     */
    get_txid(): TransactionSignDataHash;

    /**
     * @returns {TransactionSignDataHash}
     */
    get_tx_sign_data_hash(): TransactionSignDataHash;

    /**
     * Deprecated: Use `get_tx_sign_data_hash` instead\
     * @returns {AuthenticatedTransaction}
     */
    build(): AuthenticatedTransaction;

    /**
     * @returns {AuthenticatedTransaction}
     */
    finalize(): AuthenticatedTransaction;
  }
  /**
   * Type for representing the hash of a Transaction, necessary for signing it
   */
  declare export class TransactionSignDataHash {
    free(): void;

    /**
     * @param {Uint8Array} bytes
     * @returns {TransactionSignDataHash}
     */
    static from_bytes(bytes: Uint8Array): TransactionSignDataHash;

    /**
     * @param {string} input
     * @returns {TransactionSignDataHash}
     */
    static from_hex(input: string): TransactionSignDataHash;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;
  }
  /**
   */
  declare export class U128 {
    free(): void;

    /**
     * @param {any} bytes
     * @returns {U128}
     */
    static from_be_bytes(bytes: any): U128;

    /**
     * @param {any} bytes
     * @returns {U128}
     */
    static from_le_bytes(bytes: any): U128;

    /**
     * @param {string} s
     * @returns {U128}
     */
    static from_str(s: string): U128;

    /**
     * @returns {string}
     */
    to_str(): string;
  }
  /**
   * Unspent transaction pointer. This is composed of:
   * * the transaction identifier where the unspent output is (a FragmentId)
   * * the output index within the pointed transaction\'s outputs
   * * the value we expect to read from this output, this setting is added in order to protect undesired withdrawal
   * and to set the actual fee in the transaction.
   */
  declare export class UtxoPointer {
    free(): void;

    /**
     * @param {FragmentId} fragment_id
     * @param {number} output_index
     * @param {Value} value
     * @returns {UtxoPointer}
     */
    static new(
      fragment_id: FragmentId,
      output_index: number,
      value: Value
    ): UtxoPointer;
  }
  /**
   */
  declare export class UtxoWitness {
    free(): void;

    /**
     * @returns {Uint8Array}
     */
    as_bytes(): Uint8Array;

    /**
     * @returns {string}
     */
    to_bech32(): string;

    /**
     * @returns {string}
     */
    to_hex(): string;

    /**
     * @param {Uint8Array} bytes
     * @returns {UtxoWitness}
     */
    static from_bytes(bytes: Uint8Array): UtxoWitness;

    /**
     * @param {string} bech32_str
     * @returns {UtxoWitness}
     */
    static from_bech32(bech32_str: string): UtxoWitness;

    /**
     * @param {string} input
     * @returns {UtxoWitness}
     */
    static from_hex(input: string): UtxoWitness;
  }
  /**
   * Type used for representing certain amount of lovelaces.
   * It wraps an unsigned 64 bits number.
   * Strings are used for passing to and from javascript,
   * as the native javascript Number type can\'t hold the entire u64 range
   * and BigInt is not yet implemented in all the browsers
   */
  declare export class Value {
    free(): void;

    /**
     * Parse the given string into a rust u64 numeric type.
     * @param {string} s
     * @returns {Value}
     */
    static from_str(s: string): Value;

    /**
     * Return the wrapped u64 formatted as a string.
     * @returns {string}
     */
    to_str(): string;

    /**
     * @param {Value} other
     * @returns {Value}
     */
    checked_add(other: Value): Value;

    /**
     * @param {Value} other
     * @returns {Value}
     */
    checked_sub(other: Value): Value;
  }
  /**
   */
  declare export class VrfPublicKey {
    free(): void;

    /**
     * @param {string} bech32_str
     * @returns {VrfPublicKey}
     */
    static from_bech32(bech32_str: string): VrfPublicKey;
  }
  /**
   * Structure that proofs that certain user agrees with
   * some data. This structure is used to sign `Transaction`
   * and get `SignedTransaction` out.
   *
   * It\'s important that witness works with opaque structures
   * and may not know the contents of the internal transaction.
   */
  declare export class Witness {
    free(): void;

    /**
     * Generate Witness for an utxo-based transaction Input
     * @param {Hash} genesis_hash
     * @param {TransactionSignDataHash} transaction_id
     * @param {PrivateKey} secret_key
     * @returns {Witness}
     */
    static for_utxo(
      genesis_hash: Hash,
      transaction_id: TransactionSignDataHash,
      secret_key: PrivateKey
    ): Witness;

    /**
     * @param {UtxoWitness} witness
     * @returns {Witness}
     */
    static from_external_utxo(witness: UtxoWitness): Witness;

    /**
     * Generate Witness for an account based transaction Input
     * the account-spending-counter should be incremented on each transaction from this account
     * @param {Hash} genesis_hash
     * @param {TransactionSignDataHash} transaction_id
     * @param {PrivateKey} secret_key
     * @param {SpendingCounter} account_spending_counter
     * @returns {Witness}
     */
    static for_account(
      genesis_hash: Hash,
      transaction_id: TransactionSignDataHash,
      secret_key: PrivateKey,
      account_spending_counter: SpendingCounter
    ): Witness;

    /**
     * @param {AccountWitness} witness
     * @returns {Witness}
     */
    static from_external_account(witness: AccountWitness): Witness;

    /**
     * Get string representation
     * @returns {string}
     */
    to_bech32(): string;
  }
  /**
   */
  declare export class Witnesses {
    free(): void;

    /**
     * @returns {number}
     */
    size(): number;

    /**
     * @param {number} index
     * @returns {Witness}
     */
    get(index: number): Witness;
  }

}
