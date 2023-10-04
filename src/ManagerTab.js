import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerTab.css'; // Import the CSS file

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
    } else if (selectedStatus === 'Certification Pending for Approval') {
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

  const approveCertification = (CertificationID) => {
    // Validate comment before approval
    if (!commentTexts[CertificationID].trim()) {
      setCommentError((prevCommentErrors) => ({
        ...prevCommentErrors,
        [CertificationID]: 'Comment is required before approval.',
      }));
      return;
    }

    // Create an object with the parameters for the stored procedure
    const params = {
      CertificationId: CertificationID, // Replace with the actual CertificationID
      Type: 'Approve',
      Status: 'Completed',
      Comments: commentTexts[CertificationID],
      UpdatedBy: sessionStorage.getItem('empid'), // Replace with the actual UpdatedBy value
    };

    // Make a POST request to call the stored procedure using Axios
    axios
      .post('http://localhost:8000/update-certification', params) // Replace with the actual API endpoint
      .then((response) => {
        console.log('Certification approved successfully:', response.data);

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
              Status: 'Completed',
            };
          }
          return certification;
        });

        setCertificationsData(updatedCertificationsData);

        // Update filteredCertifications to include the approved certification
        setFilteredCertifications(updatedCertificationsData);
      })
      .catch((error) => {
        console.error('Error approving certification:', error);
      });
  };

  const rejectCertification = (CertificationID) => {
    // Validate comment before rejection
    if (!commentTexts[CertificationID].trim()) {
      setCommentError((prevCommentErrors) => ({
        ...prevCommentErrors,
        [CertificationID]: 'Comment is required before rejection.',
      }));
      return;
    }

    // Create an object with the parameters for the stored procedure
    const params = {
      CertificationId: CertificationID, // Replace with the actual CertificationID
      Type: 'Reject',
      Status: 'Rejected',
      Comments: commentTexts[CertificationID],
      UpdatedBy: sessionStorage.getItem('empid'), // Replace with the actual UpdatedBy value
    };

    // Make a POST request to call the stored procedure using Axios
    axios
      .post('http://localhost:8000/update-certification', params) // Replace with the actual API endpoint
      .then((response) => {
        console.log('Certification rejected successfully:', response.data);

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
              Status: 'Rejected',
            };
          }
          return certification;
        });

        setCertificationsData(updatedCertificationsData);

        // Update filteredCertifications to include the rejected certification
        setFilteredCertifications(updatedCertificationsData);
      })
      .catch((error) => {
        console.error('Error rejecting certification:', error);
      });
  };

  const onHoldCertification = (CertificationID) => {
    // Validate comment before putting a certification on hold
    if (!commentTexts[CertificationID].trim()) {
      setCommentError((prevCommentErrors) => ({
        ...prevCommentErrors,
        [CertificationID]: 'Comment is required before putting on hold.',
      }));
      return;
    }

    // Create an object with the parameters for the stored procedure
    const params = {
      CertificationId: CertificationID, // Replace with the actual CertificationID
      Type: 'On-Hold',
      Status: 'On-Hold',
      Comments: commentTexts[CertificationID],
      UpdatedBy: sessionStorage.getItem('empid'), // Replace with the actual UpdatedBy value
    };

    // Make a POST request to call the stored procedure using Axios
    axios
      .post('http://localhost:8000/update-certification', params) // Replace with the actual API endpoint
      .then((response) => {
        console.log('Certification put on hold:', response.data);

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
              Status: 'On-Hold',
            };
          }
          return certification;
        });

        setCertificationsData(updatedCertificationsData);

        // Update filteredCertifications to include the certification on hold
        setFilteredCertifications(updatedCertificationsData);
      })
      .catch((error) => {
        console.error('Error putting certification on hold:', error);
      });
  };

  const revokeCertification = (CertificationID) => {
    // Validate comment before revoking a certification
    if (!commentTexts[CertificationID].trim()) {
      setCommentError((prevCommentErrors) => ({
        ...prevCommentErrors,
        [CertificationID]: 'Comment is required before revoking.',
      }));
      return;
    }

    // Create an object with the parameters for the stored procedure
    const params = {
      CertificationId: CertificationID, // Replace with the actual CertificationID
      Type: 'Revoke',
      Status: 'Revoked',
      Comments: commentTexts[CertificationID],
      UpdatedBy: sessionStorage.getItem('empid'), // Replace with the actual UpdatedBy value
    };

    // Make a POST request to call the stored procedure using Axios
    axios
      .post('http://localhost:8000/update-certification', params) // Replace with the actual API endpoint
      .then((response) => {
        console.log('Certification revoked:', response.data);

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
              Status: 'Revoked',
            };
          }
          return certification;
        });

        setCertificationsData(updatedCertificationsData);

        // Update filteredCertifications to include the revoked certification
        setFilteredCertifications(updatedCertificationsData);
      })
      .catch((error) => {
        console.error('Error revoking certification:', error);
      });
  };

  const ResumeCertification = (CertificationID) => {
    // Implement your logic to resume a certification here
    if (!commentTexts[CertificationID].trim()) {
      setCommentError((prevCommentErrors) => ({
        ...prevCommentErrors,
        [CertificationID]: 'Comment is required before resuming.',
      }));
      return;
    }

    // Create an object with the parameters for the stored procedure
    const params = {
      CertificationID: CertificationID, // Replace with the actual CertificationID
      Type: 'Resume',
      Status: 'In-Progress',
      Comments: commentTexts[CertificationID],
      UpdatedBy: sessionStorage.getItem('empid'), // Replace with the actual UpdatedBy value
    };

    // Make a POST request to call the stored procedure using Axios
    axios
      .post('http://localhost:8000/update-certification', params) // Replace with the actual API endpoint
      .then((response) => {
        console.log('Certification resumed:', response.data);

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
              Status: 'In-Progress',
            };
          }
          return certification;
        });

        setCertificationsData(updatedCertificationsData);

        // Update filteredCertifications to include the resumed certification
        setFilteredCertifications(updatedCertificationsData);
      })
      .catch((error) => {
        console.error('Error resuming certification:', error);
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
              <th>Certification Id</th>
              <th>Certification Name</th>
              <th>Employee Id</th>
              <th>Level</th>
              <th>CertificateURL</th>
              <th>Status</th>
              <th>Revoke Status</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map((certification, index) => (
              <tr key={index}>
                <td>{certification.CertificationID}</td>
                <td>{certification.CertificationName}</td>
                <td>{certification.EmpId}</td>
                <td>{certification.Level}</td>
                <td style={{ width: '30%' }}>
                  <a href={certification.CertificateURL} target="_blank" rel="noopener noreferrer">
                    {certification.CertificateURL}
                  </a>
                </td>
                <td>{certification.Status}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{certification.RevokeStatus}</td>
                <td>
                  {status === 'Certification Pending for Approval' || status === 'In-Progress' ? (
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
                <td>
                  {status === 'Certification Pending for Approval' && (
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
                            onClick={() => rejectCertification(certification.CertificationID)}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            className="button"
                            onClick={() => approveCertification(certification.CertificationID)}
                          >
                            Approve
                          </button>
                          <button
                            className="button"
                            onClick={() => rejectCertification(certification.CertificationID)}
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
                        onClick={() => onHoldCertification(certification.CertificationID)}
                      >
                        On-Hold
                      </button>
                      <button
                        className="button"
                        onClick={() => revokeCertification(certification.CertificationID)}
                      >
                        Revoke
                      </button>
                    </div>
                  )}
                  {status === 'Others' && certification.Status === 'On-Hold' && (
                    <div>
                      {showCommentInput[certification.CertificationID] ? (
                        <div>
                          <input
                            type="text"
                            placeholder="Comment..."
                            value={commentTexts[certification.CertificationID] || ''}
                            onChange={(e) => handleCommentChange(certification.CertificationID, e)}
                          />
                          <button
                            className="button"
                            onClick={() => ResumeCertification(certification.CertificationID)}
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
          onClick={() => setSelectedStatus('Certification Pending for Approval')}
        >
          Certification Pending for Approval
        </button>
        <button className="status-button" onClick={() => setSelectedStatus('Completed')}>
          Completed Certifications
        </button>
        <button className="status-button" onClick={() => setSelectedStatus('In-Progress')}>
          In-Progress Certifications
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
        <p>Select a status from the navigation bar above to view certifications.</p>
      )}
    </div>
  );
};

export default RequestApprovalTab;
