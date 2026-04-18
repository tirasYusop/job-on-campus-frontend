import React, { useState } from "react";
import "./css/TermsPopup.css";

export default function TermsPopup() {
  const [show, setShow] = useState(true); // ALWAYS show on load

  const handleAccept = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="terms-overlay">
      <div className="terms-box">
        <h2>Welcome to Job On Campus (UMS)</h2>

        <p className="terms-intro">
          Sila baca dan terima syarat penggunaan sebelum meneruskan.
        </p>

        <div className="terms-content">
          <h4>1. Syarat Umum Penggunaan</h4>

          <p>
            <b>a. Ketepatan Maklumat:</b> Semua maklumat yang didaftarkan sama ada
            pendaftaran atau penawaran kerja mestilah tepat, sahih, dan tidak palsu.
            <br /><br />

            <b>b. Larangan Penyalahgunaan:</b> Pengguna dilarang keras menggunakan
            platform ini untuk menawarkan perkhidmatan yang menyalahi undang-undang,
            tugasan akademik seperti mengupah orang menyiapkan tugasan/plagiat, atau
            aktiviti yang tidak bermoral. Wajib mematuhi peraturan-peraturan yang telah
            ditetapkan Universiti.
            <br /><br />

            <b>c. Tindakan Tatatertib:</b> Pihak pengurusan JOC berhak membatalkan
            penyertaan, menyenaraihitamkan, atau menyekat mana-mana pelajar atau
            majikan yang melanggar peraturan yang ditetapkan.
          </p>
        </div>

        <button className="accept-btn" onClick={handleAccept}>
          Accept and Continue
        </button>
      </div>
    </div>
  );
}