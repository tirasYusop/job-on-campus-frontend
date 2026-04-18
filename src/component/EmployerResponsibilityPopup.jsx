import React, { useState, useEffect } from "react";
import "./css/TermsPopup.css";

export default function EmployerResponsibilityPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("employerPopupSeen");

    if (!seen) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("employerPopupSeen", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="terms-overlay">
      <div className="terms-box">
        <h2>Tanggungjawab Majikan</h2>
        <h4>(Vendor / Penyedia Kerja)</h4>

        <div className="terms-content">
          <p>
            <b>a. Kejelasan Skop Kerja & Gaji:</b> Majikan wajib mengisi butiran
            tawaran kerja dengan lengkap dan jelas termasuk kadar upah, masa kerja,
            lokasi dan skop tugas.
          </p>

          <p>
            <b>b. Jaminan Pembayaran:</b> Majikan mesti membayar upah tepat pada
            masanya selepas pelajar selesai melaksanakan tugas.
          </p>

          <p>
            <b>c. Keselamatan Pekerja:</b> Majikan bertanggungjawab menyediakan
            persekitaran kerja yang selamat dan tidak boleh memaksa pelajar melakukan
            kerja berbahaya di luar skop asal.
          </p>

          <p>
            <b>d. Pembatalan Pekerjaan:</b> Jika kerja dibatalkan, majikan perlu
            memberi notis sekurang-kurangnya 24 jam lebih awal.
          </p>
        </div>

        <button className="accept-btn" onClick={handleClose}>
          Faham & Tutup
        </button>
      </div>
    </div>
  );
}