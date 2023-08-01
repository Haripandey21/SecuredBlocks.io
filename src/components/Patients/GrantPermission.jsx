import React, { useState, useEffect } from 'react';
import getWeb3 from '../web3Utils';
import ABI from "../../ABI/contractAbi.json";
import "../../styles/App.css";
import Loading from "../helpers/Loading"

const GrantPermission = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

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
    // Call the grantPermission function when formSubmitted state changes to true
    if (contract && formSubmitted) {
      setIsLoading(true);
      grantPermission();
    }
  }, [contract, formSubmitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Set the formSubmitted state to true to trigger the useEffect hook
    setFormSubmitted(true);
  };

  const grantPermission = async () => {
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    try {
      setIsRevoking(true);
      await contract.methods.grantAccess(hospitalAddress).send({ from: currentAccount });
      alert(`Access granted for ${hospitalAddress}`);
      console.log("Access granted for hospital address:", hospitalAddress);
      setHospitalAddress('');
    } catch (error) {
      console.error('Error calling contract function:', error);
    } finally {
      setIsLoading(false);
      setIsRevoking(false);
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isRevoking && <Loading />}
      <div className={`content-container ${isRevoking ? 'blur' : ''}`}>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="hospitalAddress" className="block text-gray-700 font-bold mb-2">
              Hospital Address:
            </label>
            <input
              type="text"
              id="hospitalAddress"
              name="hospitalAddress"
              placeholder="Enter Hospital Address"
              value={hospitalAddress}
              onChange={(e) => setHospitalAddress(e.target.value)}
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Grant Access
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GrantPermission;
