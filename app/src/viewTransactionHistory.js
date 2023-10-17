import { ethers } from 'ethers';


export default async function viewTransactionHistory(structContractAbi, structContractAddress) {
    // Connect to a local network
    // const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

    // use ethereum local node
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Create a contract instance
    const simpleStructContract = new ethers.Contract(structContractAddress, structContractAbi, provider); 

    // Call the 'getStruct' function
    const retrievedStruct = await simpleStructContract.getAllStructs();

    // Convert the array of values to an array of JavaScript objects
    const retrievedStructArray = retrievedStruct.map(values => ({
        escrowContractAddress: values[0],
        arbiter: values[1],
        beneficiary: values[2],
        value: values[3]/ 10**18 + ' ' + 'Eth'
    }));

    return retrievedStructArray;
}
