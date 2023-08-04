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
        const contractAddress = "0xD004585023a799C7Ac3dba15FC513Dcf155b508D";
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
    <div
      style={{
        backgroundImage: `url("/bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="/" className="flex items-center">
                <img
                 src="/logo.png"  
              
                  alt="SecuredBlocks Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  SecuredBlocks
                </span>
              </a>
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
              </button>
              <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a
                      href="/PatientProfile"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Home{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </nav>
        {isLoading && <Loading />}
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p class="text-3xl font-medium text-gray-900 dark:text-white">
            Hospitals Accessing your Data:{" "}
          </p>
        </div>
        <br />
        <p></p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {hospitalLists.map((address, index) => (
            <div key={index} className="border border-gray-300 rounded p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                Hospital Address :{" "}
              </p>
              <p className="text-1xl font-thin text-gray-900 dark:text-white">
                {address}
              </p>
              <br />
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleRevokeAccess(address)}
                id="btn1"
              >
                Revoke Access
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalsList;
