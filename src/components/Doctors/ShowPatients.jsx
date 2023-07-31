import { useState, useEffect } from 'react';
import getWeb3 from '../web3Utils';
import ABI from '../../ABI/contractAbi.json';
import { Link } from 'react-router-dom';


const ShowPatients = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [patientsLists, setPatientsLists] = useState([]);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const contractAddress = '0xfE976Fc362E64c4Ef7638B2D64EA52608479b05E';
        const contractInstance = new web3Instance.eth.Contract(ABI, contractAddress);
        setContract(contractInstance);
      } catch (error) {
        console.error('ERROR INITIALIZING Web3:', error);
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
      const patientsLists = await contract.methods.getAccessedPatientData().call({ from: currentAccount });
      setPatientsLists(patientsLists); // Update the patient list state
    } catch (error) {
      console.error('Error calling contract function:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your patients :</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {patientsLists.map((patient, index) => (
          <Link to={`/showPatientsNfts/${patient}`} key={index}>
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h5 className="text-lg font-semibold mb-2">Patient {index + 1}</h5>
              Address : <p className="text-gray-600">{patient}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
        };
  
export default ShowPatients;
 

