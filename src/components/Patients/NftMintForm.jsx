import { useState } from "react";
import { Web3Storage } from "web3.storage";
import { Buffer } from "buffer";
import { AES } from "crypto-js";
import NftMintContractInteraction from "./MintNftContract";
import "../../styles/App.css";
import "../../styles/Custom.css";

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
        <div style={{ backgroundImage: `url("/background.png")`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: "100vh" }}>

            <div className="login-box">

                <form onSubmit={handleSubmit} >
                    <div className="user-box">
                        <input
                            id="event-name"
                            name="event-name"
                            type="text"
                            required
                            value={username || ""}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Your Name </label>
                    </div>


                    <div className="user-box">
                        <input
                            id="hospital-name"
                            name="hospital-name"
                            type="text"
                            required
                            value={hospitalName || ""}
                            onChange={(e) => setHospitalName(e.target.value)}
                        />
                        <label>Hospital Name </label>
                    </div>


                    <div className="user-box">
                        <input
                            id="hospital-phone"
                            name="hospital-phone"
                            type="text"
                            required
                            value={hospitalPhoneNumber || ""}
                            onChange={(e) => setHospitalPhoneNumber(e.target.value)}
                        />
                        <label>Hospital PhoneNumber </label>
                    </div>


                    <div className="user-box">
                        <input
                            id="hospital-address"
                            name="hospital-address"
                            type="text"
                            required
                            value={hospitalAddress || ""}
                            onChange={(e) => setHospitalAddress(e.target.value)}
                        />
                        <label>Hospital Address </label>
                    </div>
                    <div className="user-box">
                        <input
                            id="event-image"
                            name="event-image"
                            type="file"
                            required
                            multiple
                            onChange={handleFileChange}
                        />      <label></label>
                    </div>
                    <NftMintContractInteraction
                  formSubmitted={formSubmitted}
                  jsonDataCid={jsonDataCid}
                />

                    <center>
                    <button type = "submit" class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Mint &#x1F680;
  </span>
</button>
                        </center>
                </form>
            </div>
        </div>
    );
};

export default NftMintForm;
