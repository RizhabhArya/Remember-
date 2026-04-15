export default async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_API_KEY;

  res.status(200).json({ message: "working" });
}