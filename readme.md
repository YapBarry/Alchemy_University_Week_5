# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Notes

Below is a preview of the escrow app. There are 3 sections, 1 to for the depositor to input data and deploy the escrow contract, 1 to display any contracts that the arbiter need to approve or have approved and 1 to show a history of escrow contracts that the arbiter has approved. Note that this dapp uses a tracker smart contract to keep track of all the escrow contracts that have been deployed on the dapp.

If you want to deploy your code to a new tracker smart contract, please change the following lines of code:
Line 35-36 - remove the contract address. This existing address ("0x13c12cB49d270f943aCBd7081F72046D9448DC59") in the code was the one I deployed the tracker to on Goerli testnet.
```
// ****************************UPDATE THIS ONCE YOU HAVE DEPLOYED YOUR ESCROW TRACKER CONTRACT***************************************
let structContractAddress;
```

Uncomment lines 116-121 below so that you can deploy your own tracker to store the escrow contract history of deployed contracts.

```
    // if (!tracker) {
    //   console.log('creating new tracker...')
    //   structContractAddress = await newTracker();
    //   setTracker(true);
    //   console.log(`structContractAddress in if (!tracker) loop is is ${structContractAddress}`);
    // }
```

Once you have deployed your own tracker smart contract, please update line 35 with the contract address and also comment out lines 116-121.

Below is a guide of how to use the escrow dapp:

1)  Connect the Depositor wallet to the dapp.
2)  The Depositor then inputs the arbiter and beneficiary addresses in the fields provided.
3)  Then user decides how much to deposit in the escrow contract in the value field.
4)  Click the "deploy" button.
5)  Approve transactions in Metamask popout.
6)  Once the escrow contract is deployed, it appears on the section on the right as a contract to approve.
7)  Connect the Arbiter wallet to the dapp.
8)  Choose a deployed escrow contract to approve.
9)  Approve transaction in Metamask popout.
10)  Once approved, the approved escrow contract details will appear in the section "Contracts Stored on Struct".

![Screenshot 2023-10-17 at 8 36 24 AM](https://github.com/YapBarry/Alchemy_University_Week_5/assets/58761788/bbe84f13-ddab-4f45-bc69-72a880323542)

## Future Improvements
1) Contracts to approve disappear once website is refreshed.
2) Add timestamp for contracts that have been approved.

