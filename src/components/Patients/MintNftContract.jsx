import { useState, useEffect } from "react";
import getWeb3 from "../web3Utils";
import ABI from "../../ABI/contractAbi.json";
import "../../styles/App.css";
import Loading from "../helpers/Loading";
const MintNftContract = ({ formSubmitted, jsonDataCid }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
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
        console.error("ERROR INITILIZING Web3:", error);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    // Call the mintNft function when formSubmitted state changes to true
    if (formSubmitted && contract) {
      mintNft();
    }
  }, [formSubmitted, contract]);

  const mintNft = async () => {
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    try {
      setIsLoading(true);
      await contract.methods
        .safeMint(jsonDataCid)
        .send({ from: currentAccount });
      setIsLoading(false);
      alert("Minted successfully!");
      console.log("Minted");
      window.location.reload();
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  };

  return (
    <div>
      {/* Conditionally render the Loading component */}
      {isLoading && <Loading />}

      {/* Blur the form when isLoading is true */}
      <div className={` ${isLoading ? "blurred" : ""}`}>
        {/* Your NftMintForm component content */}
      </div>
    </div>
  );
};
export default MintNftContract;
