const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

router.get("/public", async (req, res) => {
  try {
    const { data, error } = await supabase.storage.from("Images").list("", {
      limit: 1000,
    });

    if (error) return res.status(500).json({ error: error.message });

    const urls = data.map(
      (item) =>
        supabase.storage.from("Images").getPublicUrl(item.name).data.publicUrl
    );

    res.json({ urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
