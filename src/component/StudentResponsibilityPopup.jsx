import React, { useState, useEffect } from "react";
import "./css/TermsPopup.css";

export default function StudentResponsibilityPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("studentPopupSeen");

    if (!seen) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("studentPopupSeen", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="terms-overlay">
      <div className="terms-box">
        <h2>Tanggungjawab Pelajar</h2>
        <h4>(Pencari Kerja)</h4>

        <div className="terms-content">
          <p>
            <b>a. Kelayakan Diri:</b> Hanya pelajar yang masih aktif dan berdaftar
            sahaja dibenarkan menggunakan platform ini untuk mencari kerja.
          </p>

          <p>
            <b>b. Komitmen dan Disiplin:</b> Pelajar yang telah menerima tawaran kerja
            wajib hadir tepat pada waktu dan melaksanakan tugas dengan penuh tanggungjawab.
            Kerja sambilan tidak boleh dijadikan alasan untuk meninggalkan kuliah,
            tutorial, atau peperiksaan.
          </p>

          <p>
            <b>c. Pembatalan oleh Pelajar:</b> Sekiranya tidak dapat hadir, pelajar wajib
            memaklumkan sekurang-kurangnya 12 jam sebelum waktu kerja. Pembatalan saat
            akhir tanpa alasan munasabah boleh menyebabkan akaun disenaraihitamkan.
          </p>

          <p>
            <b>d. Etika dan Profesionalisme:</b> Pakaian mestilah kemas dan sopan.
            Komunikasi dengan majikan perlu menggunakan bahasa yang baik serta mematuhi
            kod etika universiti sepanjang tempoh bekerja.
          </p>
        </div>

        <button className="accept-btn" onClick={handleClose}>
          Faham & Tutup
        </button>
      </div>
    </div>
  );
}