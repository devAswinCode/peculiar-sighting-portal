const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const DATA_FILE = "reports.json";

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// API route to submit a report
app.post("/api/report", (req, res) => {
  const reports = JSON.parse(fs.readFileSync(DATA_FILE));

  const report = {
    id: Date.now(),
    ...req.body,
    submittedAt: new Date().toISOString()
  };

  reports.push(report);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reports, null, 2));

  res.json({ success: true });
});

// API route to get all reports
app.get("/api/reports", (req, res) => {
  const reports = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(reports);
});

// ✅ Serve submission form at /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Serve reports page at /reports.html
app.get("/reports.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reports.html"));
});

// Serve other static files (CSS, images, JS)
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

