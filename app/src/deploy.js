import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import SimpleStruct from './artifacts/contracts/Tracker.sol/SimpleStruct.json';


// signer would be the one that deploys the contract while the other args like arbiter, 
// bene and value will be passed into the smart contract constructor
export default async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(arbiter, beneficiary, { value });
}

// there is no constructor in SimpleStruct so no need other parameters in the deployTracker input
export async function deployTracker(signer) {
  const factory = new ethers.ContractFactory(
    SimpleStruct.abi,
    SimpleStruct.bytecode,
    signer
  );
  return factory.deploy();
}

