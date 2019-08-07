// @flow

export const snapshot = {
  name: 'yoroi-schema',
  version: 2,
  tables: {
    ConceptualWallet: [{
      CoinType: 2147485463,
      Name: 'My Test Wallet',
      ConceptualWalletId: 1
    }],
    Key: [{
      // private - Bip44RootId: 1
      Hash: 'c8bf95a562d0f668340b0dc383860596225422eaf69c592c66b70c19b5e59744d8eed3ad296a0e3335d9dbe7d2200d525653d2c3ff4be10d4a96e14eb1a503d66238b3b8cf2ab4e2df16f6e49a0f86dff6c9ed409e91492071624781bcaa12d5',
      IsEncrypted: false,
      PasswordLastUpdate: null,
      KeyId: 1
    }, {
      // private - Bip44AccountId: 1
      Hash: '38f4756b5e17bf572bedb1907af68e70a212cdb70c699b3456a6502dc5e59744176b525648d58a2caad58cd4df53e9ab65b5f394d7d215972a7a7de23d43ef706fb042cc7a78843824c8d1afddd3ccb3a37be249881bbacf85c3192f2dca7060',
      IsEncrypted: false,
      PasswordLastUpdate: null,
      KeyId: 2
    }, {
      // public - Bip44AccountId: 1
      Hash: '30037ce72ab2163c2e2d8f864b974c7176f64c53b66a81db18640f267eed13b36fb042cc7a78843824c8d1afddd3ccb3a37be249881bbacf85c3192f2dca7060',
      IsEncrypted: false,
      PasswordLastUpdate: null,
      KeyId: 3
    }, {
      // private - Bip44AccountId: 2
      Hash: 'b078646cd70aa2e46df819733ff847d5673465127a5a12d0404ae31fc4e5974439fee08adb3ffc2b335e04fe0bf5c21dfb02ab0446e6d01bd674cfd420bec9dc5991e29a6db8779a29421acbcad6e42af414ffcacd8b68f1c01589f739f93a08',
      IsEncrypted: false,
      PasswordLastUpdate: null,
      KeyId: 4
    }, {
      // public - Bip44AccountId: 2
      Hash: 'bc31c83c1b03a6b976ced49e524512ee11e46dcdcace361c2527df22fc78c6ec5991e29a6db8779a29421acbcad6e42af414ffcacd8b68f1c01589f739f93a08',
      IsEncrypted: false,
      PasswordLastUpdate: null,
      KeyId: 5
    }],
    Bip44Derivation: [{
      // Bip44RootId: 1
      PublicKeyId: null,
      PrivateKeyId: 1,
      Index: 0,
      Bip44DerivationId: 1
    }, {
      // Bip44PurposeId: 1
      PublicKeyId: null,
      PrivateKeyId: null,
      Index: 2147483692,
      Bip44DerivationId: 2
    }, {
      // Bip44CoinTypeId: 1
      PublicKeyId: null,
      PrivateKeyId: null,
      Index: 2147485463,
      Bip44DerivationId: 3
    }, {
      // Bip44AccountId: 1
      PublicKeyId: 3,
      PrivateKeyId: 2,
      Index: 2147483648,
      Bip44DerivationId: 4
    }, {
      // Bip44ChainId: 1
      PublicKeyId: null,
      PrivateKeyId: null,
      Index: 0,
      Bip44DerivationId: 5
    }, {
      // Bip44AddressId: 1
      PublicKeyId: null,
      PrivateKeyId: null,
      Index: 0,
      Bip44DerivationId: 6
    }, {
      // Bip44ChainId: 2
      PublicKeyId: null,
      PrivateKeyId: null,
      Index: 1,
      Bip44DerivationId: 7
    }, {
      // Bip44AccountId: 2
      PublicKeyId: 5,
      PrivateKeyId: 4,
      Index: 2147483649,
      Bip44DerivationId: 8
    }],
    Bip44Wrapper: [{
      ConceptualWalletId: 1,
      IsBundled: false,
      SignerLevel: 3,
      PublicDeriverLevel: 3,
      Version: 2,
      Bip44WrapperId: 1
    }],
    Bip44DerivationMapping: [{
      // Bip44RootId: 1 => Bip44PurposeId: 1
      Parent: 1,
      Child: 2,
      Bip44DerivationMappingId: 1
    }, {
      // Bip44PurposeId: 1 => Bip44CoinTypeId: 1
      Parent: 2,
      Child: 3,
      Bip44DerivationMappingId: 2
    }, {
      // Bip44CoinTypeId: 1 => Bip44AccountId: 1
      Parent: 3,
      Child: 4,
      Bip44DerivationMappingId: 3
    }, {
      // Bip44AccountId: 1 => Bip44ChainId: 1
      Parent: 4,
      Child: 5,
      Bip44DerivationMappingId: 4
    }, {
      // Bip44ChainId: 1 => Bip44AddressId: 1
      Parent: 5,
      Child: 6,
      Bip44DerivationMappingId: 5
    }, {
      // Bip44AccountId: 1 => Bip44ChainId: 2
      Parent: 4,
      Child: 7,
      Bip44DerivationMappingId: 6
    }, {
      // Bip44CoinTypeId: 1 => Bip44AccountId: 2
      Parent: 3,
      Child: 8,
      Bip44DerivationMappingId: 7
    }],
    PrivateDeriver: [{
      Bip44WrapperId: 1,
      Bip44DerivationId: 1,
      Level: 0,
      PrivateDeriverId: 1
    }],
    PublicDeriver: [{
      Bip44DerivationId: 4,
      Name: 'First account',
      LastBlockSync: 0,
      PublicDeriverId: 1
    }, {
      Bip44DerivationId: 8,
      Name: 'Checking account',
      LastBlockSync: 0,
      PublicDeriverId: 2
    }],
    Bip44Root: [{
      Bip44DerivationId: 1,
      Bip44RootId: 1
    }],
    Bip44Purpose: [{
      Bip44DerivationId: 2,
      Bip44PurposeId: 1
    }],
    Bip44CoinType: [{
      Bip44DerivationId: 3,
      Bip44CoinTypeId: 1
    }],
    Bip44Account: [{
      // First account
      Bip44DerivationId: 4,
      Bip44AccountId: 1
    }, {
      // Checking account
      Bip44DerivationId: 8,
      Bip44AccountId: 2
    }],
    Bip44Chain: [{
      // external chain
      Bip44DerivationId: 5,
      LastReceiveIndex: 0,
      Bip44ChainId: 1
    }, {
      // internal chain
      Bip44DerivationId: 7,
      LastReceiveIndex: null,
      Bip44ChainId: 2
    }],
    Bip44Address: [{
      Bip44DerivationId: 6,
      Hash: 'Ae2tdPwUPEZCfyggUgSxD1E5UCx5f5hrXCdvQjJszxE7epyZ4ox9vRNUbHf',
      Bip44AddressId: 1
    }]
  }
};
