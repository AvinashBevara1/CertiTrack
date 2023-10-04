import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManagerTab.css"; // Import the CSS file
import EditCertificationModal from "./EditCertificationModal";

const MyCertification = () => {
  const [certificationsData, setCertificationsData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("In-Progress");
  const [filteredCertifications, setFilteredCertifications] = useState([]);
  const [showCertifications, setShowCertifications] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const EmpID = String(sessionStorage.getItem("empid")); // Replace with the actual employee ID
    const apiUrl = `http://localhost:8000/get-emp-certificates/${EmpID}/self`;

    axios
      .get(apiUrl)
      .then((response) => {
        const certificationsData = response.data;
        setCertificationsData(certificationsData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCertificationsData([]);
      });
  }, []);

  useEffect(() => {
    // Filter certifications based on the selected status
    if (selectedStatus === "") {
      setShowCertifications(false); // Hide certifications initially
    } else if (selectedStatus === "All") {
      setFilteredCertifications(certificationsData);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else if (selectedStatus === "Certification Pending for Approval") {
      const filtered = certificationsData.filter(
        (certification) =>
          certification.Status === "Approval Pending" &&
          certification.RevokeStatus !== "Revoked"
      );
      setFilteredCertifications(filtered);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else if (selectedStatus === "Completed") {
      const filtered = certificationsData.filter(
        (certification) =>
          certification.Status === "Completed" &&
          certification.RevokeStatus !== "Revoked"
      );
      setFilteredCertifications(filtered);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else if (selectedStatus === "In-Progress") {
      const filtered = certificationsData.filter(
        (certification) =>
          certification.Status === "In-Progress" &&
          certification.RevokeStatus !== "Revoked"
      );
      setFilteredCertifications(filtered);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else if (selectedStatus === "Others") {
      const filtered = certificationsData.filter(
        (certification) =>
          certification.RevokeStatus === "Revoked" ||
          !["Completed", "In-Progress", "Approval Pending"].includes(
            certification.Status
          )
      );
      setFilteredCertifications(filtered);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else {
      const filtered = certificationsData.filter(
        (certification) => certification.Status === selectedStatus
      );
      setFilteredCertifications(filtered);
      setShowCertifications(true); // Show certifications when a filter is applied
    }
  }, [selectedStatus, certificationsData]);

  const renderCertificationsTable = (certifications) => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Certificate Name</th>
              {selectedStatus === "In-Progress" && (
                <>
                  <th>Level</th>
                  <th>Due Date</th>
                  <th>Comments</th>
                  <th>Edit</th>
                </>
              )}
              {(selectedStatus === "Completed" ||
                selectedStatus === "Approval Pending" ||
                selectedStatus === "Others") && (
                <>
                  <th>Issued On</th>
                  <th>Expiry Date</th>
                  <th>Certificate URL</th>
                  <th>Status</th>
                  <th>Comments</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {certifications.map((certification) => (
              <tr key={certification.CertificationID}>
                <td>{certification.CertificationName}</td>
                {selectedStatus === "In-Progress" && (
                  <>
                    <td>{certification.Level}</td>
                    <td>{certification.DueDate}</td>
                    <td>{certification.Comments}</td>
                    <td>
                      <button onClick={() => handleEdit(certification)}>
                        Edit
                      </button>
                    </td>
                  </>
                )}
                {(selectedStatus === "Completed" ||
                  selectedStatus === "Approval Pending" ||
                  selectedStatus === "Others") && (
                  <>
                    <td>{certification.IssuedOn}</td>
                    <td>{certification.ExpiryDate}</td>
                    <td>{certification.CertificateURL}</td>
                    <td>{certification.Status}</td>
                    <td>{certification.Comments}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleEdit = (certification) => {
    setSelectedCertification(certification);
    setEditModalOpen(true);
    console.log("Edit button clicked for certification:", certification);
  };

  


  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedCertification(null);
  };

  // Function to save edited data from the modal
  const saveEditedData = (editedData) => {
    // Implement the logic to save the edited data to the server
    // You can make an API call here to update the certification data
    const formData={
      CertificationId: editedData.CertificationID, // Fill in the appropriate values
      Type: "Complete", // Fill in the appropriate values
      Comments: editedData.Comments, // Fill in the appropriate values
      UpdatedBy: sessionStorage.getItem('empid'), // Fill in the appropriate values
      IssuedOn: editedData.IssuedOn, // Fill in the appropriate values
      ExpiryDate: editedData.ExpiryDate, // Fill in the appropriate values
      CertificateUrl: editedData.CertificateURL, // Fill in the appropriate values
      Score: editedData.Score// Fill in the appropriate values
    }
    try {
      const response =axios.post("http://localhost:8000/complete-certification/", formData);
      console.log("Request succeeded:", response.data);
      // Handle success, e.g., display a success message or update your UI
    } catch (error) {
      console.error("Request failed:", error);
      // Handle error, e.g., display an error message or handle the error appropriately
    }
    console.log("Edited Data:", editedData);
  };

  return (
    <div className="container">
      <div>
        <button
          className="status-button"
          onClick={() => setSelectedStatus("In-Progress")}
        >
          In-Progress Certifications
        </button>
        <button
          className="status-button"
          onClick={() => setSelectedStatus("Completed")}
        >
          Completed Certifications
        </button>
        <button
          className="status-button"
          onClick={() => setSelectedStatus("Approval Pending")}
        >
          Approval Pending Certifications
        </button>
        <button
          className="status-button"
          onClick={() => setSelectedStatus("Others")}
        >
          Other Categories
        </button>
      </div>
      {showCertifications ? (
        <div>
          <h2>{selectedStatus}</h2>
          {renderCertificationsTable(filteredCertifications)}
        </div>
      ) : (
        <p>
          Select a status from the navigation bar above to view certifications.
        </p>
      )}
      {editModalOpen && (
        <EditCertificationModal
          certification={selectedCertification}
          onClose={closeEditModal}
          onSave={saveEditedData}
        />
      )}
    </div>
  );
};

export default MyCertification;
