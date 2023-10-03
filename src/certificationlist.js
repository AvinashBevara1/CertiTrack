import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";


function Certifications() {
  // console.log("home page click");
  
  const [certifications, setCertifications] = useState([]);

  const navigate = useNavigate();

  const handleClick = (certificateID) => {
    // Navigate to the '/home/QA' route with the certificateID as a URL parameter
    navigate(`/QA/${certificateID}`);
  }


  useEffect(() => {
    // Make an HTTP GET request to your FastAPI endpoint
    axios
      .get("http://localhost:8000/certifications") // Update the URL as needed
      .then((response) => {
        setCertifications(response.data.certifications);
      })
      .catch((error) => {
        console.error("Error fetching certification data:", error);
      });
  }, []);

  return (
    <div className="certifications">
      <h2>Certifications</h2>
      <div>
        {certifications.map((certification) => (
          <div
            onClick={() => handleClick(certification.certificateid)}
            key={certification.certificateid}
            style={{
              margin: "2%",
              padding: "2%",
              borderWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
            }}
          >
            <strong>ID: {certification.certificateid}</strong>{" "}
            {certification.provider} - {certification.certificatename} -{" "}
            {certification.count}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certifications;
