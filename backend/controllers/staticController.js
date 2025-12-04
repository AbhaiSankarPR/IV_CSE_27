const { google } = require("googleapis");
const { db } = require("../config/firebase");
const credentials = require("../credentials.json");
require("dotenv").config();

async function getItineraries() {
  try {
    const itinerariesArray = [];
    const snapshot = await db
      .collection("itineraries")
      .orderBy("dayNumber")
      .get();

    snapshot.forEach((doc) => {
      itinerariesArray.push(doc.data());
    });

    return itinerariesArray;
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    return [];
  }
}

async function getUtensils() {
  try {
    const utensilsArray = [];
    const snapshot = await db.collection("utensils").orderBy("sectionNo").get();

    snapshot.forEach((doc) => {
      utensilsArray.push(doc.data());
    });

    return utensilsArray;
  } catch (error) {
    console.error("Error fetching utensils:", error);
    return [];
  }
}

async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const { spreadsheetId } = process.env;
  const range = "Sheet1!A1:B2";

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values;
}

module.exports = {
  getItineraries,
  getUtensils,
  getSheetData,
};
