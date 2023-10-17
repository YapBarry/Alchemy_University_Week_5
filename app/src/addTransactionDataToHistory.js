import { ethers } from 'ethers';


export default async function addDataToStruct(signer, structContractAbi, structContractAddress, data) {
    // Connect to a local network
    // const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

    // use ethereum local node
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(structContractAddress, structContractAbi, provider);

    // Assuming 'addStruct' is the function to add data in your contract
    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.addStruct(data.escrowContractAddress, data.arbiter, data.beneficiary, data.value);

    // Wait for the transaction to be mined
    await tx.wait();
}

