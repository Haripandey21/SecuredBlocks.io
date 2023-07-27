import React, { useState, useEffect } from 'react';
import getWeb3 from './web3Utils';
import ABI from "../ABI/contractAbi.json";

  const ContractInteraction = ({ formSubmitted,jsonDataCid }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const contractInstance = new web3Instance.eth.Contract(ABI, "0x23eC6063F3dB924BA1a2d9102354b2A1161435eF");
        setContract(contractInstance);
      } catch (error) {
        console.error('Error initializing web3:', error);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    // Call the mintNft function when formSubmitted state changes to true
    if (formSubmitted && contract) {
      mintNft();
    }
  }, [formSubmitted, contract]);

  const mintNft = async () => {
    // Get the current connected account from MetaMask
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    try {
      await contract.methods.safeMint(jsonDataCid).send({ from: currentAccount });
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  };

  return (
    <div>
    </div>
  );
};

export default ContractInteraction;
