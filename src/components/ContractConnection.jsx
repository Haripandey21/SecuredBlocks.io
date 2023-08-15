import { useState, useEffect } from "react";
import getWeb3 from "./web3Utils";
import ABI from "../ABI/contractAbi.json";

const ContractConnection = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        const currentAccount = accounts[0];
        setAccount(currentAccount);

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

  return { contract, account };
};

export default ContractConnection;
