import React, { useState, useEffect } from 'react';
import getWeb3 from '../web3Utils';
import ABI from "../../ABI/contractAbi.json";

const ShowNfts = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenUrls, setTokenUrls] = useState([]);

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

  const handleCardClick = (tokenId) => {
    const tokenUrl = tokenUrls[tokenIds.indexOf(tokenId)];
    window.open(`https://${tokenUrl}.ipfs.dweb.link`, '_blank');
  };

  return (
    <div>
      {tokenIds.map((tokenId, index) => (
        <div key={tokenId} className="card" onClick={() => handleCardClick(tokenId)}>
          <h2>TokenID: {tokenId}</h2>
        </div>
      ))}
    </div>
  );
};

export default ShowNfts;
