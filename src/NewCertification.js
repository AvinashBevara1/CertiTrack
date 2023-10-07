import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NewCertification.css";
import { format } from "date-fns";
import axios from "axios";

function NewCertification() {
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [dueDate, setDueDate] = useState(null);
  const [comments, setComments] = useState("");
  const [certificateOptions, setCertificateOptions] = useState([]);
  const [ReporteeOptions, setReporteeOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/certifications")
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

    const empid = String(sessionStorage.getItem("empid"));
    axios
      .get(`http://localhost:8000/get-reportees/${empid}`)
      .then((response) => {
        console.log(response.data);
        const ReporteeOptions = response.data.map((repo) => ({
          value: repo.EmpId,
          label: repo.EmpName,
        }));
        setReporteeOptions(ReporteeOptions);
      })
      .catch((error) => {
        console.error("Error fetching certification data:", error);
      });
  }, []);

  const formRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formattedDueDate = dueDate ? format(dueDate, "yyyy-MM-dd") : null;
    const formData = {
      CertificateID: selectedCertificate,
      EmpID: employeeName,
      AssignedBy: sessionStorage.getItem("empid"),
      CreatedBy: sessionStorage.getItem("empid"),
      Comments: comments,
      Status: "In-Progress",
      DueDate: formattedDueDate,
      ExpiryDate: null,
      IssuedOn: null,
      CertificateURL: null,
      Score: null,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/submit-certificate",
        formData
      );

      console.log("Certificate submitted successfully:", response.data);
      alert(response.data.SubmitResponse);

      setSelectedCertificate("");
      setEmployeeName("");
      setStatus("In-Progress");
      setDueDate(null);
      setComments("");
    } catch (error) {
      console.error("Error submitting certificate:", error);
      alert("An error occurred during certificate submission.");
    }
  };

  return (
    <div className="NC-certificate-div">
      <h1>Certificate Entry Form</h1>

      <form className="NC-form" onSubmit={onSubmit} ref={formRef}>
        <div className="NC-certificate-form">
          <div className="NC-grid-item">
            <label>Certificate List:</label>
            <select
              className="NC-select"
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
          <div className="NC-grid-item">
            <label>Employee Name:</label>
            <select
              className="NC-select"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Employee
              </option>
              {ReporteeOptions.map((employee) => (
                <option key={employee.value} value={employee.value}>
                  {employee.label}
                </option>
              ))}
            </select>
          </div>
          <div className="NC-grid-item">
            <label>Due Date:</label>
            <DatePicker
              className="NC-date-picker"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="NC-grid-item-empty"></div>
          <div className="NC-grid-item-comments" colSpan="2">
            <label className="NC-label">Comments:</label>
            <textarea
              className="NC-textarea"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="NC-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewCertification;
