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

module.exports = {
  getItineraries,
  getUtensils,
};
