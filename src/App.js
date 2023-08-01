import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientProfile from "./components/Patients/PatientProfile";
import Home from "./components/Home";
import DoctorProfile from "./components/Doctors/DoctorProfile";
import NftMintForm from "./components/Patients/NftMintForm";
import ShowNfts from "./components/Patients/ShowNfts";
import MintNftContract from "./components/Patients/MintNftContract";
import GrantPermission from "./components/Patients/GrantPermission";
import "./styles/App.css";
import HospitalsList from "./components/Patients/HospitalsList";

import ShowPatients from "./components/Doctors/ShowPatients";
import ShowPatientsNfts from "./components/Doctors/ShowPatientsNfts";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PatientProfile" element={<PatientProfile />} />
        <Route path="/NftMintForm" element={<NftMintForm />} />
        <Route path="/ShowNfts" element={<ShowNfts />} />
        <Route path="/DoctorProfile" element={<DoctorProfile />} />
        <Route path="/MintNftContract" element={<MintNftContract />} />
        <Route path="/GrantPermission" element={<GrantPermission />} />
        <Route path="/HospitalsList" element={<HospitalsList />} />
        <Route path="/ShowPatients" element={<ShowPatients />} />
        <Route path="/ShowPatientsNfts" element={<ShowPatientsNfts />}>
          <Route path=":patientAddress" element={<ShowPatientsNfts />} />

        </Route>

        {/* Fallback route for unknown paths */}
      </Routes>
    </Router>
  );
}
