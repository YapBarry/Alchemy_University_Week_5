// https://www.youtube.com/watch?v=VzF2iTTc0MA for dark mode tutorial
import React, { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import deploy , { deployTracker }from './deploy';
import Escrow from './Escrow';

// for wallet connection functionality
import Web3Modal from 'web3modal';
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';

import './App.css';
import addDataToStruct from './addTransactionDataToHistory';
import viewTransactionHistory from './viewTransactionHistory';
import { structContractABI } from './Abi.js';

// for dark mode
import ReactSwitch from 'react-switch';


export const ThemeContext = createContext(null);

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Web3Modal Demo',
      infuraid: { 5: process.env.GOERLI_URL },
    },
  },
};

// use ethereum local node
const provider = new ethers.providers.Web3Provider(window.ethereum);

// ****************************UPDATE THIS ONCE YOU HAVE DEPLOYED YOUR ESCROW TRACKER CONTRACT***************************************
let structContractAddress = "0x13c12cB49d270f943aCBd7081F72046D9448DC59";

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [structs, setStructs] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [web3Provider, setWeb3Provider] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [tracker, setTracker] = useState(null);
  const structContractAbi = structContractABI;


  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();

    // Watch for changes in the wallet connection status
    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [account]);

  // each time we add a escrow contract to the escrows array, we call fetchdata() to update the allStructs state/array
  useEffect(() => {
    async function fetchData() {
      const allStructs = await viewStruct(structContractAbi, structContractAddress);
      setStructs(allStructs);
    }
    console.log(`in useeffect: fetching data from tracker address ${structContractAddress}`)
    fetchData();
  }, [escrows]);

  const handleAccountsChanged = () => {
    // when the connected account changes, update the web3Provider state with "windows.ethereum" (typically metamask)
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    setWeb3Provider(newProvider);
  };

  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      if (web3ModalProvider) {
        setWeb3Provider(web3ModalProvider);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    
    const ethInputValue = document.getElementById('eth').value;
    let value = ethers.utils.parseUnits(ethInputValue, 'ether');
    
    // creating new tracker. Uncomment lines 131-136 if deploying for the first time
    // if (!tracker) {
    //   console.log('creating new tracker...')
    //   structContractAddress = await newTracker();
    //   setTracker(true);
    //   console.log(`structContractAddress in if (!tracker) loop is is ${structContractAddress}`);
    // }

    // Use the updated web3Provider instead of the global provider
    const escrowContract = await deploy(web3Provider.getSigner(), arbiter, beneficiary, value);

    const escrow = {
      escrowContractAddress: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(escrowContract, signer);
      },
    };

    const escrowWithoutHandleFunc = (({escrowContractAddress, arbiter, beneficiary, value}) => ({escrowContractAddress, arbiter, beneficiary, value}))(escrow);

    await addTransaction(structContractAbi, structContractAddress, escrowWithoutHandleFunc);

    // setting escrow which will trigger viewStruct in console
    setEscrows([...escrows, escrow]);
  }

  // this function deploys a smart contract tracker that stores (and you can view them later) all the deployed contracts from the escrow in a strut
  // and returns the contract address - because setting the new CA in state is slow
  async function newTracker() {
    const trackerContract = await deployTracker(web3Provider.getSigner());
    console.log(`tracker deployed to contract address ${trackerContract.address}`)
    return trackerContract.address
  }

  async function addTransaction(structContractAbi, structContractAddress, data) {
    await addDataToStruct(signer, structContractAbi, structContractAddress, data);
  }

  async function viewStruct(structContractAbi, structContractAddress) {
    const returnedStruct = await viewTransactionHistory(structContractAbi, structContractAddress );
    return returnedStruct;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <nav className="App-header">
          <label> {theme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} />
        </nav>
        <div className="contract">
          {web3Provider == null ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <div>
              <p>Connected!</p>
              <p>Wallet Address: {web3Provider.provider.selectedAddress}</p>
            </div>
          )}
          <h1> New Contract </h1>
          <label>
            Arbiter Address
            <input type="text" id="arbiter" />
          </label>

          <label>
            Beneficiary Address
            <input type="text" id="beneficiary" />
          </label>

          <label>
            Deposit Amount (in Eth)
            <input type="text" id="eth" />
          </label>

          <div
            className="button"
            id="deploy"
            onClick={(e) => {
              e.preventDefault();
              newContract();
            }}
          >
            Deploy
          </div>  
        </div>
        <hr/>
        <div className="existing-contracts">
          <h1> Existing Contracts </h1>

          <div id="container">
            {escrows.map((escrow) => {
              return <Escrow key={escrow.escrowContractAddress} {...escrow} />;
            })}
          </div>
        </div>
        <div className="existing-contracts">
          <h1> Contracts Stored on Struct </h1>

          <div id="container2">
            {structs.length > 0 ? (
              structs.map((struct, index) => (
                <div key={index}>
                  <p>Escrow Contract {index + 1}</p>
                  <p>Escrow Contract Address: {struct.escrowContractAddress}</p>
                  <p>Arbiter: {struct.arbiter}</p>
                  <p>Beneficiary: {struct.beneficiary}</p>
                  <p>Value: {struct.value}</p>
                  <hr/>
                </div>
              ))
            ) : (
              <p>Transaction data not stored on struct smart contract yet</p>
            )}

          </div>
        </div>
        
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
