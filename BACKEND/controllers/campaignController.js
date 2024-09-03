import Campaign from "../models/campaign.js";
import fs from "fs";
import csv from "csv-parser";
let campaigns = [];
let contacts = [];
let messages = [];
export const createCampaign = async (req, res) => {
  try {
    const { name, message } = req.body;

    const campaign = new Campaign({ name, message });
    await campaign.save();
    res.json({ success: true, campaignId: campaign._id });
  } catch (error) {
    res.status(500).json({ message: "Error creating campaign", error });
  }
};

export const uploadContact = (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  if (!req.file) {
    return res.status(400).send({ message: "Please upload a CSV file !" });
  }
  const campaignId = req.body.campaignId;
  const campaign = campaigns.find((c) => c.id === campaignId);

  const contactsList = [];
  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      contactsList.push({ campaignId, phone: row.phone, name: row.name });
    })
    .on("end", () => {
      contacts.push(...contactsList);
      contactsList.forEach((contact) => {
        messages.push({ campaignId, phone: contact.phone, sent: "pending" });
      });

      res.json({ success: true, contacts: contactsList.length });
    })
    .on("error", (err) => {
      console.log(err, "errrr");
      res.status(500).json({ error: "Failed to process file" });
    });
};
