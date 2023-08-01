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
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
    
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
     <a href="/" className="flex items-center">
         <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="SecuredBlocks Logo" />
         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SecuredBlocks</span>
     </a>
     <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
         <span className="sr-only">Open main menu</span>
     </button>
     <div className="hidden w-full md:block md:w-auto" id="navbar-default">
       <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
         <li>
           <a href="/"  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Home </a>
         </li>
       </ul>
     </div>
    </div>
    </nav>
       </nav>
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
