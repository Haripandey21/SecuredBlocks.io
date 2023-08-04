import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal"; //SafeEventEmitterProvider
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import "../../styles/DocProfile.css";

// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";

const clientId =
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk";

function DoctorProfile() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hospitalData, setHospitalData] = useState(null);
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
            appLogo: "logo.png",
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
              logoLight: "https://web3auth.io/images/logo.png",
              logoDark: "https://web3auth.io/images/logo.png",
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
              logoDark: "https://images.web3auth.io/web3auth-logo-w.svg",
              logoLight: "https://images.web3auth.io/web3auth-logo-w-light.svg",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });

        await web3auth.addPlugin(torusPlugin);

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

  const getHospitalData = async () => {
    const user = await web3auth.getUserInfo();
    console.log("username : ", user.name);
    setHospitalData(user.name);
  };
  getHospitalData();

  const showPatients = async () => {
    window.location.href = "/showPatients";
  };

  function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
      <div
        className="yurptn"
        style={{
          alignItems: "center", // Center horizontally
          position: "absolute",
          top: "50%", // Adjust the position from top
          left: "50%", // Adjust the position from left
          transform: "translate(-50%, -50%)", // Center the content using negative margins
        }}
      >
        <button className="tugra" onClick={showPatients}>
          Your Patients
        </button>
      </div>
    </>
  );

  const secureDataQuote = (
    <div
      className="boxx"
      style={{
        display: "flex", // Set display to flex
        justifyContent: "center", // Center horizontally
        textAlign: "center", // Center vertically
        position: "absolute",
        top: "50%", // Adjust the position from top
        left: "50%", // Adjust the position from left
        transform: "translate(-50%, -50%)", // Center the content using negative margins
      }}
    >
      <h1 className="dark:text-white">
        Hello <span style={{ color: "red" }}>{hospitalData}</span> hospital !!
        <br />
        Welcome to SecuredBlocks view your patients data here:
      </h1>
      <br />
    </div>
  );

  const secureDataQuote2 = (
    <div>
      <div
        className="quote"
        style={{
          textAlign: "center", // Center vertically
          position: "absolute",
          top: "20%", // Adjust the position from top
          left: "50%", // Adjust the position from left
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="koro dark:text-white">
          Unlock the power of data with seamless management - it's the heartbeat
          of a modern hospital!! <br />
          with{" "}
          <span className="text-4xl" style={{ color: "blue" }}>
            SecuredaBlocks.io
          </span>
        </h1>
      </div>
    </div>
  );

  const unloggedInView = (
    <div
      className="yurptn2"
      style={{
        display: "flex", // Set display to flex
        flexDirection: "column", // Stack items vertically
        alignItems: "center", // Center horizontally
        position: "absolute",
        top: "50%", // Adjust the position from top
        left: "50%", // Adjust the position from left
        transform: "translate(-50%, -50%)", // Center the content using negative margins
      }}
    >
      <button
        onClick={login}
        class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      >
        <span class="relative px-2 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          LogIn / Connect Wallet
        </span>
      </button>
      {secureDataQuote2}
    </div>
  );

  return (
    <div
      style={{
        backgroundImage: `url("/bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                className="h-8 mr-3"
                alt="SecuredBlocks Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                SecuredBlocks
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            ></button>
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {loggedIn && (
                <li>
                  {secureDataQuote}
                  <a
                    href="/"
                    onClick={logout}
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Log Out{" "}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </nav>

      <h1>
        <a href="http://localhost:3000/" rel="noreferrer"></a>
      </h1>
      <div>{loggedIn ? loggedInView : unloggedInView}</div>
    </div>
  );
}

export default DoctorProfile;
