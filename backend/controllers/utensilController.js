const { db } = require("../config/firebase");

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

module.exports = { getUtensils };
