import { useState, useEffect } from "react";
import getWeb3 from "../web3Utils";
import ABI from "../../ABI/contractAbi.json";

const HospitalsList = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [hospitalLists, setHospitalLists] = useState([]);

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
      await contract.methods
        .revokeAccess(hospitalAddress)
        .send({ from: currentAccount });
      console.log("Access revoked successfully!");
      // After successfully revoking access, Refreshing the page...
      fetchHospitals();
    } catch (error) {
      console.error("Error revoking access:", error);
    }
  };

  return (
    <div>
      <h1>Hospitals Accessing your Data</h1>
      <table>
        <thead>
          <tr>
            <th>Hospital Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitalLists.map((address, index) => (
            <tr key={index}>
              <td>{address}</td>
              <td>
                <button onClick={() => handleRevokeAccess(address)}>
                  Revoke Access
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalsList;
