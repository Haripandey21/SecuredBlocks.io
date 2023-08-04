import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getWeb3 from "../web3Utils";
import ABI from "../../ABI/contractAbi.json";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";

const ShowPatientsNfts = () => {
  const { patientAddress } = useParams();
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenUrls, setTokenUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [decryptedData, setDecryptedData] = useState(null);

  function decryptData(encryptedData, key) {
    const decryptedBytes = AES.decrypt(encryptedData, key);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const data = JSON.parse(decryptedData);
    return data;
  }

  async function downloadAndDisplayImages() {
    if (decryptedData && decryptedData.imageBinaries.length > 0) {
      const imageBinariesArrayBuffer = decryptedData.imageBinaries.map(
        (base64String) => Uint8Array.from(Buffer.from(base64String, "base64"))
      );

      const urls = imageBinariesArrayBuffer.map((binaryData, index) => {
        const blob = new Blob([binaryData], { type: "image/png" }); // Adjust the image type based on the actual format (e.g., "image/jpeg")
        const imageUrl = URL.createObjectURL(blob);
        return { url: imageUrl, index: index + 1 };
      });
      return urls;
    }
    console.log("No image binaries found.");
    return [];
  }

  const displayImagesInNewWindow = (urls) => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write("<html><body>");
      urls.forEach((urlData) => {
        win.document.write(
          `<img src="${urlData.url}" alt="NFT Image ${urlData.index}"><br>`
        );
      });
      win.document.write("</body></html>");
      win.document.close();
    } else {
      console.error("Unable to open new window.");
    }
  };

  useEffect(() => {
    // Download and display images when decryptedData changes
    const fetchImages = async () => {
      if (decryptedData) {
        const urls = await downloadAndDisplayImages();
        setImageUrls(urls);
        displayImagesInNewWindow(urls);
      }
    };

    fetchImages();
    // Clean up URLs when component unmounts
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [decryptedData]);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);
        const contractAddress = "0xD004585023a799C7Ac3dba15FC513Dcf155b508D";
        const contractInstance = new web3Instance.eth.Contract(
          ABI,
          contractAddress
        );
        setContract(contractInstance);
      } catch (error) {
        console.error("ERROR INITIALIZING Web3:", error);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    if (contract) {
      fetchPatientsNfts();
    }
  }, [contract, patientAddress]);

  const fetchPatientsNfts = async () => {
    // Check if the web3 object is available before trying to get patients accounts
    if (!web3) {
      console.error("Web3 not initialized.");
      return;
    }

    try {
      const tokenIds = await contract.methods
        .getTokenIdsByAddress(patientAddress)
        .call();
      setTokenIds(tokenIds);
      const tokenUrls = await Promise.all(
        tokenIds.map((tokenId) => contract.methods.tokenURI(tokenId).call())
      );
      setTokenUrls(tokenUrls);
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  };

  const handleCardClick = async (tokenId) => {
    try {
      const tokenUrl = tokenUrls[tokenIds.indexOf(tokenId)];
      const response = await fetch(
        `https://${tokenUrl}.ipfs.dweb.link/data.json`
      );

      const encryptedData = await response.text();

      const decryptedData = decryptData(
        encryptedData,
        process.env.REACT_APP_SYMMETRIC_KEY
      );
      setDecryptedData(decryptedData);
    } catch (error) {
      console.error("Error fetching or decrypting data from IPFS:", error);
    }
  };

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
      <div>
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
              >
                <span className="sr-only">Open main menu</span>
              </button>
              <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <a
                      href="/DoctorProfile"
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </nav>
        <div></div> <br />
        <div className="show-patient-text">
          <h1 className="text-1xl font-black text-gray-900 dark:text-white">
            Patient NFTs for Address:- "{patientAddress}"
          </h1>
          <br />
          <br />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "5rem",
          }}
        >
          {tokenIds.map((tokenId) => (
            <button
              key={tokenId}
              className="nftcard"
              onClick={() => handleCardClick(tokenId)}
            >
              <h2>TokenID: {tokenId}</h2>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowPatientsNfts;
