const supabase = require("../config/supabase");

async function getPublicUrls(bucket) {
  try {
    const { data, error } = await supabase.storage.from(bucket).list("", {
      limit: 1000,
    });

    if (error) {
      throw new Error(error.message);
    }

    const urls = data.map(
      (item) =>
        supabase.storage.from(bucket).getPublicUrl(item.name).data.publicUrl
    );

    return urls;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getSignedUrls(bucket) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list("", { limit: 1000 });

    if (error) throw error;

    const signed = await Promise.all(
      data.map(async (item) => {
        const { data: urlData, error: urlError } = await supabase.storage
          .from(bucket)
          .createSignedUrl(item.name, 60 * 60);

        if (urlError) throw urlError;

        return urlData.signedUrl;
      })
    );

    return signed;
  } catch (err) {
    console.error(err);
    return [];
  }
}

module.exports = { getPublicUrls, getSignedUrls };
