import React, { useState, useEffect } from "react";
import "./index.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
    

  // GET data
useEffect(() => {
  fetch("/api/sheets")
    .then((res) => res.json())
    .then((data) => {
      console.log("API:", data);

      const safeData = Array.isArray(data) ? data : data?.values || [];

      setData(safeData);
    })
    .catch((err) => {
      console.error(err);
      setData([]); // IMPORTANT fallback
    });
}, []);

  // handle input
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // POST data
  function sendData(e) {
    e.preventDefault();

    fetch("/api/sheets", {
      method: "POST",
      body: JSON.stringify(form),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);

        // refresh data after submit
        return fetch("/api/sheets");
      })
      .then((res) => res.json())
      .then((data) => setData(data.values || []));

    // reset form
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="homie">

        {/* Form */}
      <form onSubmit={sendData}>
        <div className="form-title">Send & Recieve Emails</div>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="message"
          placeholder="Message"
          type="text"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit">Send</button>
      </form>

      <hr />

      <div className="result">
    
      <input className="columncell" type="text" value="Name" />
      <input className="columncell" type="email" value="Email address" />
      <input className="columncell" type="text" value="Message" />

      {(data || []).map((row, i) => (
        <>
        <div className="resultcell" key={i}>
            <input type="text" value={JSON.stringify(row[0])}/>
            <input type="email" value={JSON.stringify(row[1])}/>
            <input type="text" value={JSON.stringify(row[2])}/>
        </div>


        </>
      ))}

      </div>
    </div>
  );
};
export default Home;