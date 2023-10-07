// EditCertificationModal.js
import React, { useState } from "react";
import './EditCertificationModal.css'

const EditCertificationModal = ({ certification, onClose, onSave}) => {
  const [issuedOn, setIssuedOn] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [score, setScore] = useState("");
  const [certificateURL, setCertificateURL] = useState("");
  const [comments, setComments] = useState("");

  const handleSave = () => {
    // Validate the input data and save it
    if (issuedOn && expiryDate && score && certificateURL && comments) {
      onSave({
        CertificationID: certification.CertificationID,
        IssuedOn: issuedOn,
        ExpiryDate: expiryDate,
        Score: score,
        CertificateURL: certificateURL,
        Comments: comments
      });
    //   onsavedata();
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Certification</h2>
        <label>Issued On:</label>
        <input
          type="date"
          value={issuedOn}
          onChange={(e) => setIssuedOn(e.target.value)}
        />
        <label>Expiry Date:</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <label>Score:</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <label>Certificate URL:</label>
        <input
          type="text"
          value={certificateURL}
          onChange={(e) => setCertificateURL(e.target.value)}
        />
        <label>Comments:</label>
        <input
          type="text"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditCertificationModal;
