import { useState, useEffect } from "react";
import getWeb3 from "../web3Utils";
import ABI from "../../ABI/contractAbi.json";

const GrantPermission = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    // Call the grantPermission function when formSubmitted state changes to true
    if (contract && formSubmitted) {
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
      await contract.methods
        .grantAccess(hospitalAddress)
        .send({ from: currentAccount });
      console.log("Access granted for hospital address:", hospitalAddress);
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Hospital Address:
          <input
            type="text"
            placeholder="enter Hospital Address"
            value={hospitalAddress}
            onChange={(e) => setHospitalAddress(e.target.value)}
          />
        </label>
        <button type="submit">Grant Access</button>
      </form>
    </div>
  );
};

export default GrantPermission;
