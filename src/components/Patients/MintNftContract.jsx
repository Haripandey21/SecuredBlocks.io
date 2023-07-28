import { useState, useEffect } from 'react';
import getWeb3 from '../web3Utils';
import ABI from "../../ABI/contractAbi.json";

const MintNft = ({ formSubmitted, jsonDataCid }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const contractAddress = '0xfE976Fc362E64c4Ef7638B2D64EA52608479b05E';
        const contractInstance = new web3Instance.eth.Contract(ABI, contractAddress);
        setContract(contractInstance);
      } catch (error) {
        console.error('ERROR INITILIZING Web3:', error);
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
      console.log("Minted");
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  };

  return (
    <div>
      {/* Display any contract-related content if needed */}
    </div>
  );
};

export default MintNft;
