import React from "react";
import "./css/TermsAndConditions.css";

export default function TermsAndConditions({ onClose }) {
  return (
    <div className="tnc-overlay" onClick={onClose}>
      <div className="tnc-card" onClick={(e) => e.stopPropagation()}>

        <h2>Terma & Syarat Penggunaan</h2>

        <p>
          Dengan menggunakan platform ini, pelajar bersetuju dengan terma dan
          syarat berikut:
        </p>

        <ol className="tnc-list">
          <li>
            <b>Kelayakan Diri:</b> Hanya pelajar yang masih aktif dan berdaftar
            sebagai pelajar sahaja dibenarkan menggunakan platform ini untuk
            mencari kerja.
          </li>

          <li>
            <b>Komitmen dan Disiplin:</b> Pelajar yang telah menerima tawaran
            kerja wajib menghadirkan diri tepat pada waktunya dan melaksanakan
            tugas dengan penuh tanggungjawab mengikut arahan vendor. Kerja
            sambilan tidak boleh dijadikan alasan untuk meninggalkan kuliah,
            tutorial, atau peperiksaan.
          </li>

          <li>
            <b>Pembatalan oleh Pelajar:</b> Sekiranya pelajar tidak dapat hadir
            atau sebarang pembatalan, pelajar wajib memaklumkan kepada majikan
            dengan segera sekurang-kurangnya 12 jam sebelum waktu kerja bermula
            agar majikan boleh mencari pengganti. Pembatalan saat akhir tanpa
            alasan munasabah boleh menyebabkan akaun disenaraihitamkan.
          </li>

          <li>
            <b>Etika dan Profesionalisme:</b> Pakaian perlulah kemas, sopan, dan
            bersesuaian dengan jenis pekerjaan. Komunikasi dengan majikan juga
            perlulah menggunakan bahasa yang baik. Wajib mematuhi kod etika
            berpakaian universiti dan menjaga disiplin sepanjang tempoh bekerja.
          </li>
        </ol>

        <button className="tnc-close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}