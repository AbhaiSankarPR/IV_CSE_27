const { db } = require("../config/firebase");

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

module.exports = {
  getItineraries,
};
