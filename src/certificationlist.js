import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import './nav.css'


function Certifications() {
  // console.log("home page click");
  
  const [certifications, setCertifications] = useState([]);

  const navigate = useNavigate();

  const handleClick = (certificateID,certificatename) => {
    // Navigate to the '/home/QA' route with the certificateID as a URL parameter
    console.log(certificatename)
    navigate(`/QA/${certificateID}`,{ state: { certificatename } });
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
      <div className="all-cards">
        {certifications.map((certification) => (
          <div className="certificate-card"
            onClick={() => handleClick(certification.certificateid,certification.certificatename)}
            key={certification.certificateid}
            style={{
              margin: "2%",
              padding: "2%",
              borderWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
            }}
          >
           <strong> Provider: </strong>{certification.provider}
            <br></br>
            <strong>{" Certificate Name :"}</strong> {certification.certificatename}
            <br></br> 
            <strong>{"Certified people: "} </strong>
            {certification.count}
          </div>
        ))}
      </div>
      </div>
  );
}

export default Certifications;
