import { useState } from "react";
import { Web3Storage } from "web3.storage";
import { Buffer } from "buffer";
import { AES } from "crypto-js";
import NftMintContractInteraction from "./MintNftContract";
import "../../styles/App.css";

window.Buffer = Buffer;
function makeStorageClient() {
  return new Web3Storage({
    token: process.env.REACT_APP_WEB3STORAGE_TOKEN,
  });
}

const NftMintForm = () => {
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalPhoneNumber, setHospitalPhoneNumber] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [jsonDataCid, setJsonDataCid] = useState(null);
  const [imageBinaries, setImageBinaries] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const client = makeStorageClient();
    // Create the data object with other attributes
    const data = {
      name: username,
      hospitalName: hospitalName,
      hospitalPhoneNumber: hospitalPhoneNumber,
      hospitalAddress: hospitalAddress,
      imageBinaries: imageBinaries,
    };
    const symmetricKey = process.env.REACT_APP_SYMMETRIC_KEY;
    console.log(symmetricKey);
    // Encrypt the data object
    const encryptedData = AES.encrypt(
      JSON.stringify(data),
      symmetricKey
    ).toString();
    const buffer = Buffer.from(encryptedData);

    try {
      // Upload the data.json file and get its CID
      // setLoadingSubmit(true);
      const files = [new File([buffer], "data.json")];
      const jsonDataCid = await client.put(files);
      setJsonDataCid(jsonDataCid);
      setFormSubmitted(true);
    } catch (error) {
      alert(
        `Oops! Something went wrong. Please refresh and try again. Error ${error}`
      );
    } finally {
      setUsername("");
      setHospitalName("");
      setHospitalPhoneNumber("");
      setHospitalAddress("");
    }
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    const filePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = Buffer.from(reader.result).toString("base64");
          resolve(base64String); // Resolve with Base64 string instead of ArrayBuffer
        };

        reader.readAsArrayBuffer(file);
      });
    });
    Promise.all(filePromises)
      .then((imageBinaries) => setImageBinaries(imageBinaries))
      .catch((error) => console.error("Error reading image files:", error));
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-xl pt-12 pb-0">Decentralized web storage ... </h1>
        </header>
        <main>
          <section className="relative py-12">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 divide-y divide-gray-200"
            >
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="event-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Your Name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="event-name"
                      name="event-name"
                      type="text"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-800 rounded-md"
                      required
                      value={username || ""}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="hospital-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Hospital Name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="hospital-name"
                      name="hospital-name"
                      type="text"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-800 rounded-md"
                      required
                      value={hospitalName || ""}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="hospital-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Hospital Phone Number
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="hospital-phone"
                      name="hospital-phone"
                      type="text"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-800 rounded-md"
                      required
                      value={hospitalPhoneNumber || ""}
                      onChange={(e) => setHospitalPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="hospital-address"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Hospital Address
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="hospital-address"
                      name="hospital-address"
                      type="text"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-800 rounded-md"
                      required
                      value={hospitalAddress || ""}
                      onChange={(e) => setHospitalAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                  <label
                    htmlFor="event-image"
                    className="block text-l font-medium text-gray-800 sm:mt-px sm:pt-2"
                  >
                    Images
                    <p className="mt-1 max-w-2xl text-sm text-dark-400">
                      Upload one or more images
                    </p>
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input
                      id="event-image"
                      name="event-image"
                      type="file"
                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-800 rounded-md"
                      required
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <NftMintContractInteraction
                formSubmitted={formSubmitted}
                jsonDataCid={jsonDataCid}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default NftMintForm;
