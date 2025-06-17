import { upload } from "@/utils/multer";
import nextConnect from "next-connect";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect();

handler.use(upload.single("resume"));

handler.post(async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    return res.status(200).json({
      message: "File uploaded",
      filePath: `/uploads/${file.filename}`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Upload failed" });
  }
});

export async function POST(req, res) {
  return handler(req, res);
}
