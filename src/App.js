import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PatientProfile from './components/Patients/PatientProfile';
import GetStarted from "./components/GetStarted";
import Login from "./components/Login";
import DoctorProfile from "./components/Doctors/DoctorProfile";
import PatientForm from "./components/PatientForm";
import ShowNfts from "./components/Patients/ShowNfts";

import ContractConnection from './components/ContractConnection';
import './styles/App.css'

export default function App() {
  
  return (
    <Router>

      <Routes>
       <Route path="/" element={< GetStarted/>} />
       <Route path="/Login" element={< Login/>} />
        <Route path="/PatientProfile" element={< PatientProfile/>} />
        <Route path="/PatientForm" element={< PatientForm/>} />
        <Route path="/ShowNfts" element={< ShowNfts/>} />
        <Route path="/DoctorProfile" element={< DoctorProfile/>} />
        <Route path="/ContractConnection" element={< ContractConnection/>} />
        
      </Routes>

    </Router>
  );
}
