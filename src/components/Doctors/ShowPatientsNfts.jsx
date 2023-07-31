import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getWeb3 from '../web3Utils';
import ABI from '../../ABI/contractAbi.json';

const ShowPatientsNfts = () => {
  const { patientAddress } = useParams();
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenUrls, setTokenUrls] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const contractAddress = '0xfE976Fc362E64c4Ef7638B2D64EA52608479b05E';
        const contractInstance = new web3Instance.eth.Contract(ABI, contractAddress);
        setContract(contractInstance);
      } catch (error) {
        console.error('ERROR INITIALIZING Web3:', error);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchPatientsNfts();
    }
  }, [contract, patientAddress]);

  const fetchPatientsNfts = async () => {
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    try {
      const tokenIds = await contract.methods.getTokenIdsByAddress(patientAddress).call();
      const tokenUrls = await Promise.all(tokenIds.map((tokenId) => contract.methods.tokenURI(tokenId).call()));
      setTokenUrls(tokenUrls);
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Patient's NFTs :</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {tokenUrls.map((tokenUrl, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <h5 className="text-lg font-semibold mb-2">Token {index + 1}</h5>
            Token URL : <p className="text-gray-600">{tokenUrl}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPatientsNfts;
