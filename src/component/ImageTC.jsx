import React from "react";
import "./css/TermsAndConditions.css";

export default function TermsImagePopup({ onClose, image }) {
  return (
    <div className="tnc-overlay" onClick={onClose}>
      <div className="tnc-image-card" onClick={(e) => e.stopPropagation()}>

        <img
          src={image}
          alt="Terms and Conditions"
          className="tnc-image"
        />

        <button className="tnc-close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}