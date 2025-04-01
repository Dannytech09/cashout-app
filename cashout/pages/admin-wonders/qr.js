import { useEffect, useState } from "react";
import { QrGenerateHandler, QrGetHandler } from "../api/admin/qr";
import { aExpireSessionAndRedirect } from "@/Utils/authCookies";
import { useRouter } from "next/router";

export default function QrPage(ctx) {
      const router = useRouter();
    
  const [qrCode, setQRCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadQR() {
      const response = await QrGetHandler();
      if (
        response.error === "Invalid token." ||
        response.error === "Token has been revoked or expired." ||
        response.error === "Forbidden!"
      ) {
        sessionStorage.clear();
        aExpireSessionAndRedirect(ctx, router);
      } else if (response.success) {
        setQRCode(response.qr);
      } else {
        setError(response.error || "Failed to load QR.");
      }
    }
    loadQR();
  }, []);

  const handleGenerateQR = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    const response = await QrGenerateHandler();
    if (response.success) {
      setMessage(response.message);
      setQRCode(null); // Clear old QR while regenerating
      setTimeout(async () => {
        const newQR = await QrGetHandler();
        if (newQR.success) {
          setQRCode(newQR.qr);
        } else {
          setError(newQR.error || "Failed to fetch new QR.");
        }
      }, 2000);
    } else {
      setError(response.error || "QR generation failed.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">QR Admin Panel</h2>

      {message && (
        <p className="mb-4 text-green-600 bg-green-100 p-2 rounded">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</p>
      )}

      <div className="flex flex-col items-center">
        {qrCode ? (
          <img
            src={qrCode}
            alt="Scan this QR to login"
            className="w-64 h-64 border border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="text-gray-500">No QR Available</p>
        )}
      </div>

      <button
        onClick={handleGenerateQR}
        disabled={loading}
        className={`mt-4 w-full px-4 py-2 text-white font-semibold rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating QR..." : "Generate New QR"}
      </button>
    </div>
  );
}
