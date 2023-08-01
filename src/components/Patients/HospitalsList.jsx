import { useState, useEffect } from "react";
import getWeb3 from "../web3Utils";
import ABI from "../../ABI/contractAbi.json";
import Loading from "../helpers/Loading";

const HospitalsList = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [hospitalLists, setHospitalLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const contractAddress = "0xfE976Fc362E64c4Ef7638B2D64EA52608479b05E";
        const contractInstance = new web3Instance.eth.Contract(
          ABI,
          contractAddress
        );
        setContract(contractInstance);
      } catch (error) {
        console.error("ERROR INITIALIZING Web3:", error);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchHospitals();
    }
  }, [contract]);

  const fetchHospitals = async () => {
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    try {
      const hospitalLists = await contract.methods
        .getAuthorizedHospitals()
        .call({ from: currentAccount });
      setHospitalLists(hospitalLists); // Set the retrieved hospital list to the state variable
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  };

  const handleRevokeAccess = async (hospitalAddress) => {
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];

    try {
      setIsLoading(true); // Show the loader while revoking access
      await contract.methods
        .revokeAccess(hospitalAddress)
        .send({ from: currentAccount });
      alert("Access Revoked Successfully !! ");
      console.log("Access revoked successfully!");
      fetchHospitals(); // After successfully revoking access, refresh the page...
    } catch (error) {
      console.error("Error revoking access:", error);
    } finally {
      setIsLoading(false); // Hide the loader after the operation is completed
    }
  };

  return (
    <div>
      {isLoading && <Loading />} {/* Show loader if isLoading is true */}
      <h1 className="text-2xl font-bold mb-4">Hospitals Accessing your Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitalLists.map((address, index) => (
          <div key={index} className="border border-gray-300 rounded p-4">
            <p className="text-lg font-bold mb-2">Hospital Address : </p>
            <p className="text-sm mb-4">{address}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleRevokeAccess(address)}
            >
              Revoke Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalsList;
