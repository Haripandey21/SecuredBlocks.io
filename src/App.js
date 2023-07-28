import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PatientProfile from './components/Patients/PatientProfile';
import GetStarted from "./components/GetStarted";
import Login from "./components/Login";
import DoctorProfile from "./components/Doctors/DoctorProfile";
import NftMint from "./components/Patients/NftMint";
import ShowNfts from "./components/Patients/ShowNfts";

import MintNftContract from './components/Patients/MintNftContract';
import './styles/App.css'

export default function App() {
 
  return (
    <Router>

      <Routes>
       <Route path="/" element={< GetStarted/>} />
       <Route path="/Login" element={< Login/>} />
        <Route path="/PatientProfile" element={< PatientProfile/>} />
        <Route path="/NftMint" element={< NftMint/>} />
        <Route path="/ShowNfts" element={< ShowNfts/>} />
        <Route path="/DoctorProfile" element={< DoctorProfile/>} />
        <Route path="/MintNftContract" element={< MintNftContract/>} />
        
      </Routes>

    </Router>
  );
}
