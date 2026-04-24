import crypto from "crypto";

const SECRET = "QR_SECRET";

function sign(id) {
  return crypto.createHmac("sha256", SECRET).update(id).digest("hex");
}

export default function handler(req, res) {
  const { id, sig } = req.query;

  if (!id || !sig) {
    return res.status(400).json({ status: "invalid" });
  }

  const valid = sign(id);

  if (sig === valid) {
    res.json({ status: "valid", message: "ASLI ✅" });
  } else {
    res.json({ status: "invalid", message: "PALSU ❌" });
  }
}
