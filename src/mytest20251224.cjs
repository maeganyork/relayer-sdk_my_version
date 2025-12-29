"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBytes32Hex = toBytes32Hex;
var node_1 = require("@zama-fhe/relayer-sdk/node");
// TypeScript version: accepts Uint8Array (any length <= 32), returns 0x + 32-byte hex string
function toBytes32Hex(input) {
    if (!(input instanceof Uint8Array))
        throw new TypeError('input must be Uint8Array');
    if (input.length > 32)
        throw new RangeError('input length must be <= 32');
    // build hex pairs
    var hex = Array.from(input)
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    // pad to 32 bytes (64 hex chars) on the right with zeros if needed
    var padded = hex.padEnd(64, '0');
    return '0x' + padded;
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var instance, buffer, ciphertexts, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, node_1.createInstance)({
                        // ACL_CONTRACT_ADDRESS (FHEVM Host chain)
                        aclContractAddress: '0xf0Ffdc93b7E186bC2f8CB3dAA75D86d1930A433D',
                        // KMS_VERIFIER_CONTRACT_ADDRESS (FHEVM Host chain)
                        kmsContractAddress: '0xbE0E383937d564D7FF0BC3b46c51f0bF8d5C311A',
                        // INPUT_VERIFIER_CONTRACT_ADDRESS (FHEVM Host chain)
                        inputVerifierContractAddress: '0xBBC1fFCdc7C316aAAd72E807D9b0272BE8F84DA0',
                        // DECRYPTION_ADDRESS (Gateway chain)
                        verifyingContractAddressDecryption: '0x5D8BD78e2ea6bbE41f26dFe9fdaEAa349e077478',
                        // INPUT_VERIFICATION_ADDRESS (Gateway chain)
                        verifyingContractAddressInputVerification: '0x483b9dE06E4E4C7D35CCf5837A1668487406D955',
                        // FHEVM Host chain id
                        chainId: 11155111,
                        // Gateway chain id
                        gatewayChainId: 10901,
                        // Optional RPC provider to host chain
                        network: 'https://1rpc.io/sepolia',
                        // Relayer URL
                        relayerUrl: 'https://relayer.testnet.zama.org',
                    })];
            case 1:
                instance = _a.sent();
                console.log('instance created');
                buffer = instance.createEncryptedInput(
                // The address of the contract allowed to interact with the "fresh" ciphertexts
                "0xB0d510586AE33b772eADCd8d0F1e27e0e9D249b1", // count one input int32 contractAddress,
                // The address of the entity allowed to import ciphertexts to the contract at `contractAddress`
                "0xFA5f472d768C33532B88BbC17A40f339af25157c" //Edge46  userAddress,
                );
                // We add the values with associated data-type method
                buffer.add64(BigInt(23393893233));
                return [4 /*yield*/, buffer.encrypt()];
            case 2:
                ciphertexts = _a.sent();
                console.log(toBytes32Hex(ciphertexts.handles[0]));
                console.log(ciphertexts.inputProof);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                process.exit(1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); })();
