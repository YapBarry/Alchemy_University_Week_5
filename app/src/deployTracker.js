import { ethers } from 'ethers';
import TransactionHistory from './artifacts/contracts/TransactionHistory.sol/TransactionHistory';

export default async function deploy2(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, { value });
}