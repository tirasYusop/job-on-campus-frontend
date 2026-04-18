import React from "react";
import "./css/TermsAndConditions.css";

export default function TermsAndConditions({ onClose }) {
  return (
    <div className="tnc-overlay" onClick={onClose}>
      <div className="tnc-card" onClick={(e) => e.stopPropagation()}>

        <h2>Terma & Syarat Penggunaan</h2>
        <h4>(Vendor / Penyedia Kerja)</h4>

        <p>
          Dengan menggunakan platform ini, peniaga bersetuju dengan terma dan
          syarat berikut:
        </p>

        <ol className="tnc-list">
          <li>
            <b>a. Kejelasan Skop Kerja & Gaji:</b> Majikan wajib mengisi butiran
            tawaran kerja dengan lengkap dan jelas termasuk kadar upah, masa kerja,
            lokasi dan skop tugas.
          </li>

          <li>
            <p>
              <b>b. Jaminan Pembayaran:</b> Majikan mesti membayar upah tepat pada
              masanya selepas pelajar selesai melaksanakan tugas.
            </p>
          </li>

          <li>
           <b>c. Keselamatan Pekerja:</b> Majikan bertanggungjawab menyediakan
            persekitaran kerja yang selamat dan tidak boleh memaksa pelajar melakukan
            kerja berbahaya di luar skop asal.
          </li>

          <li>
            <b>d. Pembatalan Pekerjaan:</b> Jika kerja dibatalkan, majikan perlu
            memberi notis sekurang-kurangnya 24 jam lebih awal.
          </li>
        </ol>

        <button className="tnc-close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}