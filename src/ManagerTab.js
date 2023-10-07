import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerTab.css'; // Import the CSS file
import { format } from 'date-fns';

const RequestApprovalTab = () => {
  const [certificationsData, setCertificationsData] = useState([]);
  const [filteredCertifications, setFilteredCertifications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(''); // Default to an empty string
  const [showCertifications, setShowCertifications] = useState(false); // Control whether to show certifications
  const [commentTexts, setCommentTexts] = useState({}); // State to manage the comment text for each certification
  const [commentError, setCommentError] = useState({}); // State to manage comment validation error
  const [showCommentInput, setShowCommentInput] = useState({}); // State to control comment input visibility

  useEffect(() => {
    // Define the API URL
    const empid = String(sessionStorage.getItem('empid'));
    const apiUrl = `http://localhost:8000/get-emp-certificates/${empid}/Manager`;

    // Fetch data from the API using Axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Assuming the API response is an array of certifications data
        setCertificationsData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to fetch data once when the component mounts

  useEffect(() => {
    // Filter certifications based on the selected status
    if (selectedStatus === '') {
      setShowCertifications(false); // Hide certifications initially
    } else if (selectedStatus === 'All') {
      setFilteredCertifications(certificationsData);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else if (selectedStatus === 'Approval Pending') {
      const filtered = certificationsData.filter(
        (certification) =>
          certification.Status === 'Approval Pending' && certification.RevokeStatus !== 'Revoked'
      );
      setFilteredCertifications(filtered);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else if (selectedStatus === 'Completed') {
      const filtered = certificationsData.filter(
        (certification) =>
          certification.Status === 'Completed' && certification.RevokeStatus !== 'Revoked'
      );
      setFilteredCertifications(filtered);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else if (selectedStatus === 'In-Progress') {
      const filtered = certificationsData.filter(
        (certification) =>
          certification.Status === 'In-Progress' && certification.RevokeStatus !== 'Revoked'
      );
      setFilteredCertifications(filtered);
      setShowCertifications(true); // Show certifications when a filter is applied
    } else if (selectedStatus === 'Others') {
      const filtered = certificationsData.filter(
        (certification) =>
          certification.RevokeStatus === 'Revoked' ||
          !['Completed', 'In-Progress', 'Approval Pending'].includes(certification.Status)
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

  const handleCommentChange = (CertificationID, e) => {
    const newText = e.target.value;

    // Update the commentTexts state immediately when the user types
    setCommentTexts((prevCommentTexts) => ({
      ...prevCommentTexts,
      [CertificationID]: newText,
    }));
  };

  const UpdateCertification = (CertificationID, Type, Status) => {
    // Validate comment before proceeding
    if (!commentTexts[CertificationID].trim()) {
      setCommentError((prevCommentErrors) => ({
        ...prevCommentErrors,
        [CertificationID]: 'Comment is required before proceeding.',
      }));
      return;
    }

    // Create an object with the parameters for the stored procedure
    const params = {
      CertificationId: CertificationID,
      Type,
      Status,
      Comments: commentTexts[CertificationID],
      UpdatedBy: sessionStorage.getItem('empid'),
    };

    // Make a POST request to call the stored procedure using Axios
    axios
      .post('http://localhost:8000/update-certification', params)
      .then((response) => {
        console.log(`Certification ${Type.toLowerCase()}ed successfully:`, response.data);

        // Set the final comment text and clear the temporary comment
        setCommentTexts((prevCommentTexts) => ({
          ...prevCommentTexts,
          [CertificationID]: '',
        }));

        // Update certificationsData to reflect the status change
        const updatedCertificationsData = certificationsData.map((certification) => {
          if (certification.CertificationID === CertificationID) {
            return {
              ...certification,
              Status,
            };
          }
          return certification;
        });

        setCertificationsData(updatedCertificationsData);
        console.log(certificationsData)
        // Update filteredCertifications to include the certification with the new status
        setFilteredCertifications(updatedCertificationsData);
      })
      .catch((error) => {
        console.error(`Error ${Type.toLowerCase()}ing certification:`, error);
      });
  };

  const submitComment = (CertificationID) => {
    const newText = commentTexts[CertificationID];
    if (!newText.trim()) {
      setCommentError((prevCommentErrors) => ({
        ...prevCommentErrors,
        [CertificationID]: 'Comment is required.',
      }));
      return;
    }

    // Implement your logic to submit the comment here
    console.log(`Comment submitted for Certification: ${CertificationID}, Comment: ${newText}`);

    // Clear the comment text, hide the comment input field, and clear any validation errors
    setCommentTexts((prevCommentTexts) => ({
      ...prevCommentTexts,
      [CertificationID]: '',
    }));
    setShowCommentInput((prevShowCommentInput) => ({
      ...prevShowCommentInput,
      [CertificationID]: false,
    }));
    setCommentError((prevCommentErrors) => ({
      ...prevCommentErrors,
      [CertificationID]: '',
    }));
  };

  const DivByStatus = ({ certifications, status }) => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>EmpId</th>
              <th>Level</th>
              {status === 'In-Progress' && <th>DueDate</th>}
              {status !== 'In-Progress' && <th>Certificate URL</th>}
              {status ==='Others' && <th>Status</th>}
              {status !== 'Completed' && <th>Comments</th>}
              {status !== 'Completed' && <th className='action-tab'>Action</th>}
            </tr>
          </thead>
          <tbody>
            {certifications.map((certification, index) => (
              <tr key={index}>
                <td>{certification.CertificationName}</td>
                <td>{certification.EmpId}</td>
                <td>{certification.Level}</td>
                {status === 'In-Progress' && <td>{certification.DueDate}</td>}
                {status !== 'In-Progress' && (
                  <td style={{ width: '30%' }}>
                    <a href={certification.CertificateURL} target="_blank" rel="noopener noreferrer">
                      {certification.CertificateURL}
                    </a>
                  </td>
                )}
                {status ==='Others' &&  <td>{certification.Status}</td>}
                {status !== 'Completed' && (
                  <td>
                    {status === 'Approval Pending' || status === 'In-Progress' ? (
                      <input
                        type="text"
                        placeholder="Comment..."
                        value={commentTexts[certification.CertificationID] || ''}
                        onChange={(e) => handleCommentChange(certification.CertificationID, e)}
                      />
                    ) : (
                      certification.Comments || ''
                    )}
                    {commentError[certification.CertificationID] && (
                      <p className="error">{commentError[certification.CertificationID]}</p>
                    )}
                  </td>
                )}
                {status !== 'Completed' && (
                  <td>
                    {status === 'Approval Pending' && (
                      <div>
                        {showCommentInput[certification.CertificationID] ? (
                          <div>
                            <button
                              className="button"
                              onClick={() => submitComment(certification.CertificationID)}
                            >
                              Submit Comment
                            </button>
                            <button
                              className="button"
                              onClick={() =>
                                UpdateCertification(certification.CertificationID, 'Reject', 'Rejected')
                              }
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              className="button"
                              onClick={() =>
                                UpdateCertification(certification.CertificationID, 'Approve', 'Completed')
                              }
                            >
                              Approve
                            </button>
                            <button
                              className="button"
                              onClick={() =>
                                UpdateCertification(certification.CertificationID, 'Reject', 'Rejected')
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {status === 'In-Progress' && (
                      <div>
                        <button
                          className="button"
                          onClick={() =>
                            UpdateCertification(certification.CertificationID, 'On-Hold', 'On-Hold')
                          }
                        >
                          On-Hold
                        </button>
                        <button
                          className="button"
                          onClick={() =>
                            UpdateCertification(certification.CertificationID, 'Revoke', 'Revoked')
                          }
                        >
                          Revoke
                        </button>
                      </div>
                    )}
                    {status === 'Others' && certification.Status === 'On-Hold' && (
                      <div>
                        {showCommentInput[certification.CertificationID] ? (
                          <div >
                            <input
                              type="text"
                              placeholder="Comment..."
                              value={commentTexts[certification.CertificationID] || ''}
                              onChange={(e) => handleCommentChange(certification.CertificationID, e)}
                            />
                            <button
                              className="button"
                              onClick={() =>
                                UpdateCertification(certification.CertificationID, 'Resume', 'In-Progress')
                              }
                            >
                              Resume
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              className="button"
                              onClick={() => {
                                setShowCommentInput((prevShowCommentInput) => ({
                                  ...prevShowCommentInput,
                                  [certification.CertificationID]: true,
                                }));
                              }}
                            >
                              Resume
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <div>
        <button
          className="status-button"
          onClick={() => setSelectedStatus('Approval Pending')}
        >
          Approval Pending
        </button>
        <button className="status-button" onClick={() => setSelectedStatus('In-Progress')}>
          In-Progress Certifications
        </button>
        <button className="status-button" onClick={() => setSelectedStatus('Completed')}>
          Completed Certifications
        </button>
        <button className="status-button" onClick={() => setSelectedStatus('Others')}>
          Other Categories
        </button>
      </div>
      {showCertifications ? (
        <div>
          <h2>{selectedStatus}</h2>
          <DivByStatus certifications={filteredCertifications} status={selectedStatus} />
        </div>
      ) : (
        <div>
          <h2>Approval Pending</h2>
          <DivByStatus certifications={filteredCertifications} status="Approval Pending" />
        </div>
      )}
    </div>
  );
};

export default RequestApprovalTab;
