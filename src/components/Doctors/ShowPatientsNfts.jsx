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
        const contractAddress = "0xfE976Fc362E64c4Ef7638B2D64EA52608479b05E";
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
    <div style={{ backgroundImage: `url("/bg.png")`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: "100vh" }}>

      <div>
        <h1 className="text-2xl font-semibold mb-4">Patient's NFTs :</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {tokenIds.map((tokenId, index) => (
            <button
              key={index}
              className="bg-white shadow-lg rounded-lg p-4"
              onClick={() => handleCardClick(tokenId)}
            >
              <h5 className="nftcard">Token {index + 1}</h5>
              Token URL : <p className="text-gray-600">{tokenId}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowPatientsNfts;
