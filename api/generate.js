import crypto from "crypto";
import QRCode from "qrcode";

const SECRET = "QR_SECRET";

function sign(id) {
  return crypto.createHmac("sha256", SECRET).update(id).digest("hex");
}

export default async function handler(req, res) {
  const id = Date.now().toString();
  const sig = sign(id);

  const data = `id=${id}&sig=${sig}`;
  const qr = await QRCode.toDataURL(data);

  res.status(200).json({ qr, data });
}
