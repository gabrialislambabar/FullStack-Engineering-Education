import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(buffer, originalname) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: originalname,
  });
  return result;
}

export default uploadFile;
