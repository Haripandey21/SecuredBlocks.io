import { useState, useEffect } from "react";
import "../../styles/App.css";
import Loading from "../helpers/Loading";
import ContractConnection from "../ContractConnection";

const MintNftContract = ({ formSubmitted, jsonDataCid }) => {
  const { contract, account } = ContractConnection();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // Call the mintNft function when formSubmitted state changes to true
    if (formSubmitted && contract) {
      mintNft();
    }
  }, [formSubmitted, contract]);

  const mintNft = async () => {
    try {
      setIsLoading(true);
      await contract.methods.safeMint(jsonDataCid).send({ from: account });
      setIsLoading(false);
      alert("Minted successfully!");
      console.log("Minted");
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
