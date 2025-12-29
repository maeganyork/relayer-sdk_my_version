import { createInstance } from '@zama-fhe/relayer-sdk/node';

// TypeScript version: accepts Uint8Array (any length <= 32), returns 0x + 32-byte hex string
export function toBytes32Hex(input: Uint8Array): string {
  if (!(input instanceof Uint8Array)) throw new TypeError('input must be Uint8Array');
  if (input.length > 32) throw new RangeError('input length must be <= 32');

  // build hex pairs
  const hex = Array.from(input)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // pad to 32 bytes (64 hex chars) on the right with zeros if needed
  const padded = hex.padEnd(64, '0');

  return '0x' + padded;
}


(async () => {
  try {
    const instance = await createInstance({
      // ACL_CONTRACT_ADDRESS (FHEVM Host chain)
      aclContractAddress: '0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D',
      // KMS_VERIFIER_CONTRACT_ADDRESS (FHEVM Host chain)
      kmsContractAddress: '0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A',
      // INPUT_VERIFIER_CONTRACT_ADDRESS (FHEVM Host chain)
      inputVerifierContractAddress: '0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0',
      // DECRYPTION_ADDRESS (Gateway chain)
      verifyingContractAddressDecryption:
        '0x5D8BD78e2ea6bbE41f26dFe9fdaEAa349e077478',
      // INPUT_VERIFICATION_ADDRESS (Gateway chain)
      verifyingContractAddressInputVerification:
        '0x483b9dE06E4E4C7D35CCf5837A1668487406D955',
      // FHEVM Host chain id
      chainId: 11155111,
      // Gateway chain id
      gatewayChainId: 10901,
      // Optional RPC provider to host chain
      network: 'https://1rpc.io/sepolia',
      // Relayer URL
      relayerUrl: 'https://relayer.testnet.zama.org',
    });
    console.log('instance created');
    // We first create a buffer for values to encrypt and register to the fhevm
    const buffer = instance.createEncryptedInput(
      // The address of the contract allowed to interact with the "fresh" ciphertexts
      "0xB0d510586AE33b772eADCd8d0F1e27e0e9D249b1", // count one input int32 contractAddress,
      // The address of the entity allowed to import ciphertexts to the contract at `contractAddress`
      "0xFA5f472d768C33532B88BbC17A40f339af25157c" //Edge46  userAddress,
    );

    // We add the values with associated data-type method
    buffer.add64(BigInt(23393893233));
    //buffer.add64(BigInt(1));
    // buffer.addBool(false);
    // buffer.add8(BigInt(43));
    // buffer.add16(BigInt(87));
    // buffer.add32(BigInt(2339389323));
    // buffer.add128(BigInt(233938932390));
    // buffer.addAddress('0xa5e1defb98EFe38EBb2D958CEe052410247F4c80');
    // buffer.add256(BigInt('2339389323922393930'));

    // This will encrypt the values, generate a proof of knowledge for it, and then upload the ciphertexts using the relayer.
    // This action will return the list of ciphertext handles.
    const ciphertexts = await buffer.encrypt();
    console.log(toBytes32Hex(ciphertexts.handles[0]));
    console.log(toBytes32Hex(ciphertexts.inputProof));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();