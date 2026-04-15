export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/AKfycbzZHaqWdIndsjHb5sFFe8uVnODEN1d-hYkJgSZjLqTcowN1hLDFzpPDGQ5puVPKbWaFzg/exec";

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}