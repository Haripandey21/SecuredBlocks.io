import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import WalletConnection from './components/WalletConnection';
import Home from "./components/Home";
// import ContactUs from "./components/ContactUs";
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
        
      </Routes>

    </Router>
  );
}
