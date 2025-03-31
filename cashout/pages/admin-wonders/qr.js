import { useEffect, useState } from "react";
import { QrGenerateHandler, QrGetHandler } from "../api/admin/qr";

export default function QrPage() {
    const [qrCode, setQRCode] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadQR(ctx) {
            const response = await QrGetHandler(ctx);
            if (response.success) {
                setQRCode(response.qr);
            }
        }
        loadQR();
    }, []);

    const handleGenerateQR = async (ctx) => {
        setLoading(true);
        await QrGenerateHandler(ctx);
        setLoading(false);
    };

    return (
        <div>
            <h2>QR Admin Panel</h2>
            {qrCode ? (
                <img src={qrCode} alt="Scan this QR to login" style={{ width: 300, height: 300 }} />
            ) : (
                <p>No QR Available</p>
            )}
            <button onClick={handleGenerateQR} disabled={loading}>
                {loading ? "Generating QR..." : "Generate New QR"}
            </button>
        </div>
    );
}
