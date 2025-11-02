const { db } = require("../config/firebaseConfig");
const { getDocs, collection } = require("firebase/firestore");

async function getItineraries() {
  try {
    const itinerariesArray = [];
    const querySnapshot = await getDocs(collection(db, "itineraries"));

    querySnapshot.forEach((doc) => {
      itinerariesArray.push(doc.data());
    });

    itinerariesArray.sort((a, b) => {
      const dayA = parseInt(a.day.match(/\d+/)?.[0] || 0);
      const dayB = parseInt(b.day.match(/\d+/)?.[0] || 0);
      return dayA - dayB;
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
