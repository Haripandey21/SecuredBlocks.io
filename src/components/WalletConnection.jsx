import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";//SafeEventEmitterProvider
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import "../styles/App.css";
import RPC from "../web3RPC"; // for using web3.js

// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";

const clientId =
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; 

function WalletConnection() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget: "https://rpc.ankr.com/eth_goerli",
          },
          uiConfig: {
            appName: "SecuredBlocks",
            appLogo: "favicon.png", 
            theme: "light",
            loginMethodsOrder: ["apple", "google", "twitter"],
            defaultLanguage: "en", 
            loginGridCol: 3,
            primaryButton: "externalLogin",
          },
          web3AuthNetwork: "cyan",
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional",
          },
          adapterSettings: {
            uxMode: "popup", // "redirect" | "popup"
            whiteLabel: {
              name: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en", 
              dark: false, 
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: {},
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: false, colors: { primary: "#a200ff" } },
              logoDark: "favicon_2.png",
              logoLight: "favicon_2.png",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });
      
        await web3auth.addPlugin(torusPlugin);

        const defaultWcSettings = await getWalletConnectV2Settings(
          "eip155",
          [1, 137, 5],
          "04309ed1007e77d1f119b85205bb779d"
        );
        const walletConnectV2Adapter = new WalletConnectV2Adapter({
          adapterSettings: { ...defaultWcSettings.adapterSettings },
          loginSettings: { ...defaultWcSettings.loginSettings },
        });

        web3auth.configureAdapter(walletConnectV2Adapter);

        // adding metamask adapter
        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600, // 1 hour in seconds
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget: "https://rpc.ankr.com/eth_goerli", 
          },
        });
        // we can change the above settings using this function
        metamaskAdapter.setAdapterSettings({
          sessionTime: 86400, // 1 day in seconds
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget: "https://rpc.ankr.com/eth_goerli",
          },
          web3AuthNetwork: "cyan",
        });

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);
        const torusWalletAdapter = new TorusWalletAdapter({
          clientId,
        });
        // it will add/update  the torus-evm adapter in to web3auth class
        web3auth.configureAdapter(torusWalletAdapter);
        setWeb3auth(web3auth);
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    setLoggedIn(true);
  
    // Check if the connected network is Goerli
    const connectedNetwork = web3authProvider.networkId;
    if (connectedNetwork === "0x5") {
      // Create a Goerli account for the user
      const rpc = new RPC(web3authProvider);
      const accounts = await rpc.getAccounts();
      if (accounts.length > 0) {
        const goerliAccount = accounts[0];
        console.log("Goerli Account:", goerliAccount);
        // Use the goerliAccount for further operations
      }
    }
  };
  
  const getUserData = async () => {
    const user = await web3auth.getUserInfo();
    console.log("username : ",user.name);
    console.log("Id :",user.verifierId);

    const rpc = new RPC(provider);

    const balance = await rpc.getBalance();
    console.log("Balance : ",balance,"eth");

    const address = await rpc.getAccounts();
    console.log("Address : ",address);

    const privateKey = await rpc.getPrivateKey();
    console.log("Private Key : ",privateKey);
    
  };



  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const initiateTopUp = async () => {
    window.location.href = "https://goerlifaucet.com";
  };

  const uploadData = async () => {
    window.location.href = "http://localhost:3000/PatientForm";
  };



  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };
  function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
    
      <div className="flex-container">
      
        <div>
          <button onClick={initiateTopUp} className="card">
            Faucet
          </button>
        </div>
        
        <div>
          <button onClick={getUserData} className="card">
           User Profile 
          </button>
        </div>
        <div>
          <button onClick={getUserData} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={uploadData} className="card">
            Upload Data
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login/ Connect Wallet
    </button>
  );

  return (
    
    <div className="container">
      <h1 className="title">
        <a href="http://localhost:3000/" rel="noreferrer">
          SecuredBlocks.io{" "}
        </a>
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
    </div>
  );
}

export default WalletConnection;
