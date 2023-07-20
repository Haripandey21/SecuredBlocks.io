import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import WalletConnection from './components/WalletConnection';
import Home from "./components/Home";
import PatientForm from "./components/PatientForm";
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Patient from './components/Patient'
import './styles/App.css'

export default function App() {
  

  return (
    <Router>

      <Routes>
       <Route path="/" element={< Home/>} />
        <Route path="/WalletConnection" element={< WalletConnection/>} />
        <Route path="/PatientForm" element={< PatientForm/>} />
        
      </Routes>

    </Router>
  );
}
