import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [campaignId, setCampaignId] = useState("1");
  const [status, setStatus] = useState({ sent: 0, pending: 0 });
  const createCampaign = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/campaigns", {
        name: campaignName,
        message: campaignMessage,
      });
      setCampaignId(response.data.campaignId);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const uploadContacts = async () => {
    const formData = new FormData();
    formData.append("contacts", selectedFile);
    try {
      await axios.post(
        `http://localhost:5000/api/campaigns/${campaignId}/upload`,
        formData
      );
    } catch (error) {
      console.error("Error uploading contacts:", error);
    }
  };

  const sendMessages = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/campaigns/${campaignId}/send`
      );
    } catch (error) {
      console.error("Error sending messages:", error);
    }
  };

  const getStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/campaigns/${campaignId}/status`
      );
      setStatus(response.data);
    } catch (error) {
      console.error("Error getting status:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">WhatsApp Marketing Tool</h1>

        <div className="mb-4">
          <input
            type="text"
            className="border p-2 mr-2"
            placeholder="Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
          <input
            type="text"
            className="border p-2"
            placeholder="Campaign Message"
            value={campaignMessage}
            onChange={(e) => setCampaignMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 ml-2"
            onClick={createCampaign}
          >
            Create Campaign
          </button>
        </div>

        {campaignId && (
          <>
            <div className="mb-4">
              <input
                type="file"
                className="border p-2"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <button
                className="bg-green-500 text-white p-2 ml-2"
                onClick={uploadContacts}
              >
                Upload Contacts
              </button>
            </div>

            <div className="mb-4">
              <button
                className="bg-yellow-500 text-white p-2"
                onClick={sendMessages}
              >
                Send Messages
              </button>
              <button
                className="bg-gray-500 text-white p-2 ml-2"
                onClick={getStatus}
              >
                Get Status
              </button>
            </div>

            <div>
              <p>Sent: {status.sent}</p>
              <p>Pending: {status.pending}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
