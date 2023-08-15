import { useState, useEffect } from "react";
import Loading from "../helpers/Loading";
import ContractConnection from "../ContractConnection";
import { Link } from "react-router-dom";

const HospitalsList = () => {
  const [hospitalLists, setHospitalLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { contract, account } = ContractConnection();

  useEffect(() => {
    if (contract) {
      fetchHospitals();
    }
  }, [contract]);

  const fetchHospitals = async () => {
    try {
      const hospitalLists = await contract.methods
        .getAuthorizedHospitals()
        .call({ from: account });
      setHospitalLists(hospitalLists); // Set the retrieved hospital list to the state variable
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  };

  const handleRevokeAccess = async (hospitalAddress) => {
    try {
      setIsLoading(true); // Show the loader while revoking access
      await contract.methods
        .revokeAccess(hospitalAddress)
        .send({ from: account });
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
          className="bg-cover bg-center bg-no-repeat min-h-screen"
          style={{ backgroundImage: `url("/bg.png")` }}
        >
      <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <Link to={"/"} className="flex items-center">
                <img
                  src="/logo.png"
                  className="h-8 mr-3"
                  alt="SecuredBlocks Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  SecuredBlocks
                </span>
              </Link>
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
                    <Link
                      to={"/PatientProfile"}
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Home{" "}
                    </Link>
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
          <p className="text-3xl font-medium text-gray-900 dark:text-white">
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
