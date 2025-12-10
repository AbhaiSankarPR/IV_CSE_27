const supabase = require("../config/supabase");

async function getPublicUrls(bucket, offset, limit) {
  try {
    const { data, error } = await supabase.storage.from(bucket).list("", {
      limit,
      offset,
      sortBy: { column: "name", order: "asc" },
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

async function getSignedUrls(bucket, offset, limit) {
  try {
    const { data, error } = await supabase.storage.from(bucket).list("", {
      limit,
      offset,
      sortBy: { column: "name", order: "asc" },
    });

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

async function uploadImages(files, bucket) {
  for (const file of files) {
    const fileName = `${Date.now()}_${file.originalname}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new Error(error.message);
    }
  }

  return true;
}

async function deleteImage(bucket, fileName) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([fileName]);

  if (error) return { error };
  return { data };
}

module.exports = { getPublicUrls, getSignedUrls, uploadImages, deleteImage };
