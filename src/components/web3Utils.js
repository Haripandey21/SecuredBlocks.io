import Web3 from 'web3';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Check if Web3 is already injected by MetaMask or similar provider
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        window.ethereum.enable().then(() => {
          resolve(web3);
        });
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error('Web3 provider not found'));
    }
  });

export default getWeb3;
