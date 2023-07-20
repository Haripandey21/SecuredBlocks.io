import React, { useState, useEffect } from 'react';
import getWeb3 from './web3Utils';
import ABI from "../ABI/contractAbi.json"

const ContractInteraction = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const contractAddress = '0x23eC6063F3dB924BA1a2d9102354b2A1161435eF';
        const contractInstance = new web3Instance.eth.Contract(ABI, contractAddress);
        setContract(contractInstance);
      } catch (error) {
        console.error('Error initializing web3:', error);
      }
    };

    initWeb3();
  }, []);
 
  const callContractFunction = async () => {
          // Get the current connected account from MetaMask
          const accounts = await web3.eth.getAccounts();
          const currentAccount = accounts[0]; 
    try {
      const result = await contract.methods.safeMint("https://bafybeifhz5pfpdzhxa7hhubzazh6lzzf5lkqwk2on7z2b7pocyigss7twa.ipfs.dweb.link/").send({ from:currentAccount});
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  };

  return (
    <div>
      <button onClick={callContractFunction}>Mint Nft </button>
    </div>
  );
};

export default ContractInteraction;
