import Web3 from 'web3';
import { Web3Auth } from "@web3auth/modal";//SafeEventEmitterProvider
import { CHAIN_NAMESPACES } from "@web3auth/base";

import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

const clientId =
  "BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk";

const getWeb3 = async () => {
  try {
    const web3auth = new Web3Auth({
      clientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x5",
        rpcTarget: "https://rpc.ankr.com/eth_goerli",
      },
      web3AuthNetwork: "cyan",
    });
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
    await web3auth.initModal();
    const web3 = new Web3(web3auth.provider);
    const accounts = await web3.eth.getAccounts();
    console.log("Connected Ethereum Accounts:", accounts);
    return web3;
  } catch (error) {
    console.error(error);
  }
};

export default getWeb3;