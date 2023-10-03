import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NewCertification.css";
import { format } from "date-fns";
import axios from "axios";

function CertificateForm(){
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [dueDate, setDueDate] = useState(null);
  const [comments, setComments] = useState("");
  const [certificateOptions, setCertificateOptions] = useState([]);
  const [ReporteeOptions, setReporteeOptions] = useState([]);

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

      const empid=String( sessionStorage.getItem('empid'))
      axios
      .get(`http://localhost:8000/get-reportees/${empid}`) // Update the URL as needed
      .then((response) => {
        console.log(response.data)
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

  // const employeeOptions = [
  //   { value: "emp1", label: "Employee 1" },
  //   { value: "emp2", label: "Employee 2" },
  //   { value: "emp3", label: "Employee 3" },
  // ];
  const formRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formattedDueDate = dueDate ? format(dueDate, "yyyy-MM-dd") : null;
    console.log({employeeName}.employeeName)
    const formData = {
      CertificateID: selectedCertificate, // Change to match your API field names
      EmpID: {employeeName}.employeeName,// Change to match your API field names
      AssignedBy: sessionStorage.getItem('empid'),
      CreatedBy:sessionStorage.getItem('empid'), // Change to match your API field names // Change to match your API field names
      Comments:comments,
      Status:"In-Progress",
      DueDate: formattedDueDate,
      ExpiryDate:null,
      IssuedOn:null,
      CertificateURL:null,
      Score:null, // Change to match your API field names
    };
  
    try {
      // Make a POST request to your API endpoint
      const response = await axios.post("http://localhost:8000/submit-certificate", formData);
  
      // Handle the response as needed
      console.log("Certificate submitted successfully:", response.data);
  
      // Reset form fields or perform other actions upon successful submission
      setSelectedCertificate("");
      setEmployeeName("");
      setStatus("InProgress");
      setDueDate(null);
      setComments("");
    } catch (error) {
      console.error("Error submitting certificate:", error);
      alert("An error occurred during certificate submission.");
    }
  };

  return (
    <div className="certificate-div">
      <h1>Certificate Entry Form</h1>

      <form className="certificate-form" onSubmit={onSubmit} ref={formRef}>
        <div className="firstrow">
          <div>
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
          <div>
            <label>Employee Name:</label>
            <select
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
          <div className="formdate">
            <label>Due Date:</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="certificate-form-textarea">
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CertificateForm;
