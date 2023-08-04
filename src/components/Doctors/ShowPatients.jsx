import { useState, useEffect } from "react";
import getWeb3 from "../web3Utils";
import ABI from "../../ABI/contractAbi.json";
import { Link } from "react-router-dom";

const ShowPatients = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [patientsLists, setPatientsLists] = useState([]);

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
      fetchPatients();
    }
  }, [contract]);

  const fetchPatients = async () => {
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    try {
      const patientsLists = await contract.methods
        .getAccessedPatientData()
        .call({ from: currentAccount });
      setPatientsLists(patientsLists); // Update the patient list state
    } catch (error) {
      console.error("Error calling contract function:", error);
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
                  className="h-8 mr-3"
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
                      href="/DoctorProfile"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </nav>
        <div>
          <br />
          <br />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: "2rem",
              padding: "0px 0px 0px 10px",
            }}
          >
            {patientsLists.map((patient, index) => (
              <Link to={`/showPatientsNfts/${patient}`} key={index}>
                <div className="patient-nft-card">
                  <div className="bg-white shadow-lg rounded-lg p-4">
                    <h5 className="text-lg font-semibold mb-2">
                      Patient {index + 1}
                    </h5>
                    Address : <p className="text-gray-600">{patient}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPatients;
