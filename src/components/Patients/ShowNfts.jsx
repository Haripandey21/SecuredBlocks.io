import React, { useState, useEffect } from 'react';
import getWeb3 from '../web3Utils';
import ABI from "../../ABI/contractAbi.json";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";

function decryptData(encryptedData, key) {
  const decryptedBytes = AES.decrypt(encryptedData, key);
  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const data = JSON.parse(decryptedData);

  // Step 1: Update the data object to include imageCids as an array
  data.imageCids = data.imageCid ? [data.imageCid] : [];

  return data;
}


const ShowNfts = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenUrls, setTokenUrls] = useState([]);
  const [decryptedData, setDecryptedData] = useState(null);
  

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
    // Check if the contract object is available before calling mintNft
    if (contract) {
      mintNft();
    }
  }, [contract, web3]);

  const mintNft = async () => {
    // Check if the web3 object is available before trying to get accounts
    if (!web3) {
      console.error('Web3 not initialized.');
      return;
    }

    try {
      // Get the current connected account from MetaMask
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];
      const tokenIds = await contract.methods.getTokenIdsByAddress(currentAccount).call();
      setTokenIds(tokenIds);

      // Fetch tokenURLs for each tokenId using Promise.all
      const tokenUrls = await Promise.all(tokenIds.map(tokenId => contract.methods.tokenURI(tokenId).call()));
      setTokenUrls(tokenUrls);
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  };
  

  const handleCardClick = async (tokenId) => {
    try {
      const tokenUrl = tokenUrls[tokenIds.indexOf(tokenId)];
      const response = await fetch(`https://${tokenUrl}.ipfs.dweb.link/data.json`);
      const encryptedData = await response.text();
      console.log("encrypted data:", encryptedData);
      const decryptedData = decryptData(encryptedData, process.env.REACT_APP_SYMMETRIC_KEY);
      console.log("decrypted data:", decryptedData);
  
      //  Get the array of imageCids
      const imageCids = decryptedData.imageCids;
  
      // Open each image in a new tab
      imageCids.forEach((imageCid) => {
        const imageUrl = `https://${imageCid[0]}.ipfs.dweb.link`;
        window.open(imageUrl, '_blank');
      });
    } catch (error) {
      console.error('Error fetching or decrypting data from IPFS:', error);
    }
  };


  
  
  return (
    <div>
      {tokenIds.map((tokenId, index) => (
        <div key={tokenId} className="nftcard" onClick={() => handleCardClick(tokenId)}>
          <h2>TokenID: {tokenId}</h2>
        </div>
      ))}

      {decryptedData && (
        <div>
          <h2>Decrypted Content:</h2>
          <pre>{JSON.stringify(decryptedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ShowNfts;
