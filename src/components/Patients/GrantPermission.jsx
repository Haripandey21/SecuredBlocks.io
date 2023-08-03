import React, { useState, useEffect } from "react";
import getWeb3 from "../web3Utils";
import ABI from "../../ABI/contractAbi.json";
import "../../styles/App.css";
import Loading from "../helpers/Loading";

const GrantPermission = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

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
      await contract.methods
        .grantAccess(hospitalAddress)
        .send({ from: currentAccount });
      alert(`Access granted for ${hospitalAddress}`);
      console.log("Access granted for hospital address:", hospitalAddress);
      setHospitalAddress("");
    } catch (error) {
      console.error("Error calling contract function:", error);
    } finally {
      setIsLoading(false);
      setIsRevoking(false);
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("/bg1.png")`,
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
        <div
          style={{
            backgroundImage: `url("/bg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        >
          <div className="flex justify-center items-center h-screen">
            {isRevoking && <Loading />}
            <div className={`content-container ${isRevoking ? "blur" : ""}`}>
              <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-8 rounded-md shadow-md"
              >
                <div className="mb-4">
                  <label
                    htmlFor="hospitalAddress"
                    className="block text-gray-700 font-bold mb-2"
                  >
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
        </div>
      </div>
    </div>
  );
};

export default GrantPermission;
