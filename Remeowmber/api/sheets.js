export default async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const SHEET_ID = "your_sheet_id";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data); // <-- IMPORTANT
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}