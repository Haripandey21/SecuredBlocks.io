import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PatientProfile from './components/Patients/PatientProfile';
import GetStarted from "./components/GetStarted";
import Login from "./components/Login";
import DoctorProfile from "./components/Doctors/DoctorProfile";
import NftMintForm from "./components/Patients/NftMintForm";
import ShowNfts from "./components/Patients/ShowNfts";

import MintNftContract from './components/Patients/MintNftContract';
import GrantPermission from './components/Patients/GrantPermission';

import './styles/App.css'
import HospitalsList from "./components/Patients/HospitalsList";

export default function App() {
 
  return (
    <Router>

      <Routes>
       <Route path="/" element={< GetStarted/>} />
       <Route path="/Login" element={< Login/>} />
        <Route path="/PatientProfile" element={< PatientProfile/>} />
        <Route path="/NftMintForm" element={< NftMintForm/>} />
        <Route path="/ShowNfts" element={< ShowNfts/>} />
        <Route path="/DoctorProfile" element={< DoctorProfile/>} />
        <Route path="/MintNftContract" element={< MintNftContract/>} />
        <Route path="/GrantPermission" element={< GrantPermission/>} />
        <Route path="/HospitalsList" element={< HospitalsList/>} />


        
        
      </Routes>

    </Router>
  );
}
