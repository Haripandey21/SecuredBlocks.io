import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

import Home from "./components/Home";
import PatientProfile from "./components/Patients/PatientProfile";
import NftMintForm from "./components/Patients/NftMintForm";
import ShowNfts from "./components/Patients/ShowNfts";
import GrantPermission from "./components/Patients/GrantPermission";
import HospitalsList from "./components/Patients/HospitalsList";

import DoctorProfile from "./components/Doctors/DoctorProfile";
import ShowPatients from "./components/Doctors/ShowPatients";
import ShowPatientsNfts from "./components/Doctors/ShowPatientsNfts";

import About from "./components/About";
import ContactUs from "./components/ContactUs";

export default function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PatientProfile" element={<PatientProfile />} />
        <Route path="/NftMintForm" element={<NftMintForm />} />
        <Route path="/ShowNfts" element={<ShowNfts />} />
        <Route path="/GrantPermission" element={<GrantPermission />} />
        <Route path="/HospitalsList" element={<HospitalsList />} />

        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/About" element={<About />} />


        <Route path="/ShowPatients" element={<ShowPatients />} />
        <Route path="/DoctorProfile" element={<DoctorProfile />} />
        <Route path="/ShowPatientsNfts" element={<ShowPatientsNfts />}>
          <Route path=":patientAddress" element={<ShowPatientsNfts />} />
        </Route>
      </Routes>
    </Router>
  );
}
