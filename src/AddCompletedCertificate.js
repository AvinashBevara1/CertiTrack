import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddCompletedCertification.css";
import { format } from "date-fns";
import axios from "axios";

function AddCertificate() {
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [issuedOn, setIssuedOn] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [score, setScore] = useState("");
  const [certificateURL, setCertificateURL] = useState("");
  const [comments, setComments] = useState("");
  const [certificateOptions, setCertificateOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/certifications") // Update the URL as needed
      .then((response) => {
        const certificateOptions = response.data.certifications.map((cert) => ({
          value: cert.certificateid,
          label: cert.certificatename,
        }));
        setCertificateOptions(certificateOptions);
      })
      .catch((error) => {
        console.error("Error fetching certification data:", error);
      });
  }, []);

  const formRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formattedIssuedOn = issuedOn ? format(issuedOn, "yyyy-MM-dd") : null;
    const formattedExpiryDate = expiryDate
      ? format(expiryDate, "yyyy-MM-dd")
      : null;

    const formData = {
      CertificateID: selectedCertificate,
      EmpID: sessionStorage.getItem("empid"),
      AssignedBy: sessionStorage.getItem("empid"),
      CreatedBy: sessionStorage.getItem("empid"),
      Comments: comments,
      Status: "Approval Pending",
      DueDate: null,
      ExpiryDate: formattedExpiryDate,
      IssuedOn: formattedIssuedOn,
      CertificateURL: certificateURL,
      Score: score,
    };

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/submit-certificate",
        formData
      );

      console.log("Certificate submitted successfully:", response.data);
      alert(response.data.SubmitResponse);
      setSelectedCertificate("");
      setExpiryDate(null);
      setCertificateURL("");
      setIssuedOn(null);
      setComments("");
      setScore("");
    } catch (error) {
      console.error("Error submitting certificate:", error);
      alert("An error occurred during certificate submission.");
    }
  };

  return (
    <div className="ACC-certificate-div">
      <form className="ACC-form" onSubmit={onSubmit} ref={formRef}>
      <h1>Add your Certification</h1>
        <div className="ACC-certificate-form" >
        <div className="ACC-row">
          <label>Certificate List:</label>
          <select
            value={selectedCertificate}
            onChange={(e) => setSelectedCertificate(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Certificate
            </option>
            {certificateOptions.map((cert) => (
              <option key={cert.value} value={cert.value}>
                {cert.label}
              </option>
            ))}
          </select>
        </div>
        <div className="ACC-row">
          <label>Score:</label>
          <input className="ACC-score"
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </div>
        <div className="ACC-row">
          <label>Issued On:</label>
          <DatePicker
            selected={issuedOn}
            onChange={(date) => setIssuedOn(date)}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>
        <div className="ACC-row">
          <label>Expiry Date:</label>
          <DatePicker
            selected={expiryDate}
            onChange={(date) => setExpiryDate(date)}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>
        <div className="ACC-row url">
          <label>Certificate URL:</label>
          <input className="ACC-url"
            type="url"
            value={certificateURL}
            onChange={(e) => setCertificateURL(e.target.value)}
            required
          />
        </div>
        <div className="ACC-row double-height">
          <label>Comments:</label>
          <textarea className="ACC-comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        </div>
        <div className="ACC-row">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddCertificate;
