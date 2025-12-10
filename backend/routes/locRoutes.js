const express = require("express");
const router = express.Router();
const { db } = require("../config/firebase");
const { verifyAccessToken, verifyAdmin } = require("../utils/tokens");
const MEETING_POINT_DOC_ID = "meetingPoint";

router.post("/save", verifyAccessToken, verifyAdmin, async (req, res) => {
  const { latitude, longitude, timestamp } = req.body;

  if (latitude === undefined || longitude === undefined || !timestamp) {
    return res.status(400).send({
      message: "Missing latitude, longitude, or timestamp in request.",
    });
  }

  const locationData = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    timestamp: new Date(timestamp),
  };

  try {
    await db
      .collection("locations")
      .doc(MEETING_POINT_DOC_ID)
      .set(locationData, { merge: false });

    return res.status(200).send({
      message: "Location saved successfully!",
    });
  } catch (error) {
    console.error("Error saving location to Firestore:", error);
    return res.status(500).send({
      message: "Failed to save location to database.",
    });
  }
});

router.get("/get", verifyAccessToken, async (req, res) => {
  try {
    const docRef = db.collection("locations").doc(MEETING_POINT_DOC_ID);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(200).send({});
    }

    const location = doc.data();

    return res.status(200).send({
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: location.timestamp.toDate().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching location from Firestore:", error);
    return res.status(500).send({
      message: "Failed to retrieve location.",
    });
  }
});

module.exports = router;
