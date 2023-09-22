
-- =============================================
-- Author: Avinash Bevara
-- Create date: 09/13/2023
-- Description: Dynamic mail to get the email body 
-- LastModified: 
-- =============================================


CREATE Procedure [dbo].[GetMail](@Action varchar(50),@CertificationID int)
as
begin
	declare @htmlstart varchar(max);
	declare @htmlend varchar(max);
	select @htmlstart = '<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>CertiTrack Service Portal</title>
        </head>
        <body
          style="
            margin: 0px;
            padding: 0px;
            font-family: -apple-system, BlinkMacSystemFont, '' Segoe UI '', Roboto,
              Oxygen, Ubuntu, Cantarell, '' Open Sans '', '' Helvetica Neue '',
              sans-serif;
              background-color: #f4f4f4;
          "
        >
        <table style="padding: 5% 25%; width: 100%; height: 100%; border-collapse: collapse;">
          <tr>
            <td>
          <table style="margin: auto; min-width: 300px; max-width: 500px; border-spacing: 10px; border: 1px solid lightgray; background-color: white;">'



	select @htmlend = '<tr>
                    <td style="padding: 10px 0px; text-align: center;" colspan="2">
                      <a href="{{domainUrl}}">View Details</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>Regards,</td>
            </tr>
            <tr>
              <td>CertiTrack.</td>
            </tr>
            <tr>
          <td style="text-align: center; background-color: #f4f4f4;">
            <img
              src="{{LogoUrl}}"
              height="25"
              width="80"
              alt="techigai logo"
            />
          </td>
        </tr>
          </table>
        </td>
        </tr>
        </table>
        </body>
      </html>'

--Body when Certification is Assigned

	  if(upper(@Action)='CERTIFICATION_ASSIGNED')
	  begin
		Select 'New Certification Assigned' as subject
		,E.Email as toemail
		,L.Email as ccmail
		,concat(@htmlstart, '<tr>
					  <td style="padding: 10px 0px; text-align: center; font-weight: bold;">
						<u>New Certification Assigned</u>
					  </td>
					</tr>
					<tr>
					  <td>Hi ',E.EmpName,',</td>
					</tr>
					<tr>
					  <td>
						',L.EmpName,' Assigned a Certification to you.
					  </td>
					</tr>
					<tr>
					  <tr>
							<td style="font-weight: bold;">
							  Please find the certification details below
							</td>
						  </tr>
					  <td>
						<table
						  style="
							width: 100%;
							height: 100%;
							border-spacing: 10px;
							border-top: 1px solid lightgray;
							border-bottom: 1px solid lightgray;
						  "
						>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Certification Name :</td>
			<td style="vertical-align: top;">', Concat_ws(' : ',Cl.CertificateName,Cl.CertificateCode) , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Provider :</td>
			<td style="vertical-align: top;">',Cl.Provider , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Level :</td>
			<td style="vertical-align: top;">', Cl.LEVEL , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Due Date :</td>
			<td style="vertical-align: top;">', C.DueDate , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">ApplyLink :</td>
			<td style="vertical-align: top;">', Cl.ApplyLink , '</td>
		  </tr>'
		,@htmlend) as body
		from  Certifications C
		join CertificateList Cl on Cl.CertificateID=C.CertificateIdFk
		join Employee E on E.EmpId=C.EmpID
		join Employee L on L.EmpId=C.AssignedBy
		where c.CertificationId=@CertificationID
	end

--Certification Revoked
	if(upper(@Action)='CERTIFICATION_REVOKED')
	  begin
		Select 'Certification Revoked' as subject
		,E.Email as toemail
		,L.Email as ccmail
		,concat(@htmlstart, '<tr>
					  <td style="padding: 10px 0px; text-align: center; font-weight: bold;">
						<u>Certification Revoked</u>
					  </td>
					</tr>
					<tr>
					  <td>Hi ',E.EmpName,',</td>
					</tr>
					<tr>
					  <td>
						',L.EmpName,' has revoked your Certification.
					  </td>
					</tr>
					<tr>
					  <tr>
							<td style="font-weight: bold;">
							  Please find the certification details below
							</td>
						  </tr>
					  <td>
						<table
						  style="
							width: 100%;
							height: 100%;
							border-spacing: 10px;
							border-top: 1px solid lightgray;
							border-bottom: 1px solid lightgray;
						  "
						>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Certification Name :</td>
			<td style="vertical-align: top;">', Concat_ws(' : ',Cl.CertificateName,Cl.CertificateCode) , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Provider :</td>
			<td style="vertical-align: top;">',Cl.Provider , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Level :</td>
			<td style="vertical-align: top;">', Cl.LEVEL , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Due Date :</td>
			<td style="vertical-align: top;">', C.DueDate , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">ApplyLink :</td>
			<td style="vertical-align: top;">', Cl.ApplyLink , '</td>
		  </tr>'
		,@htmlend) as body
		from  Certifications C
		join CertificateList Cl on Cl.CertificateID=C.CertificateIdFk
		join Employee E on E.EmpId=C.EmpID
		join Employee L on L.EmpId=C.AssignedBy
		where c.CertificationId=@CertificationID
	end

--If Certification is Approved after completion
	if(upper(@Action)='CERTIFICATION_APPROVED')
	begin
		Select 'Certification Approved' as subject
		,E.Email as toemail
		,L.Email as ccmail
		,concat(@htmlstart, '<tr>
					  <td style="padding: 10px 0px; text-align: center; font-weight: bold;">
						<u>Certification Approved</u>
					  </td>
					</tr>
					<tr>
					  <td>Hi ',E.EmpName,',</td>
					</tr>
					<tr>
					  <td>
						You have successfully completed the certification course. ' ,L.EmpName ,' has verified your results and approved your certificate. Well done!
					  </td>
					</tr>
					<tr>
					  <tr>
							<td style="font-weight: bold;">
							  Please find the certification details below
							</td>
						  </tr>
					  <td>
						<table
						  style="
							width: 100%;
							height: 100%;
							border-spacing: 10px;
							border-top: 1px solid lightgray;
							border-bottom: 1px solid lightgray;
						  "
						>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Certification Name :</td>
			<td style="vertical-align: top;">', Concat_ws(' : ',Cl.CertificateName,Cl.CertificateCode) , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Provider :</td>
			<td style="vertical-align: top;">',Cl.Provider , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Level :</td>
			<td style="vertical-align: top;">', Cl.LEVEL , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Score :</td>
			<td style="vertical-align: top;">', C.Score , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">IssuedOn :</td>
			<td style="vertical-align: top;">', C.IssuedOn , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Expiry Date :</td>
			<td style="vertical-align: top;">', C.ExpiryDate , '</td>
		  </tr>'
		,'<tr>
                  <td style="min-width: 100px; vertical-align: top;">Certificate URL :</td>
                  <td onclick="location.href=''',C.CertificateURL,'''" ; style="color:Blue;cursor:pointer;text-decoration:underline" >View Certificate</td>
          </tr>'
		,@htmlend) as body
		from  Certifications C
		join CertificateList Cl on Cl.CertificateID=C.CertificateIdFk
		join Employee E on E.EmpId=C.EmpID
		join Employee L on L.EmpId=C.ApprovedBy
		where c.CertificationId=@CertificationID
	end

--Request to lead for approving the completed certification
	if(upper(@Action)='CERTIFICATION_APPROVAL_REQUEST')
	begin
		Select 'Certification Approval Request' as subject
		,L.Email as toemail
		,'' as ccmail
		,concat(@htmlstart, '<tr>
					  <td style="padding: 10px 0px; text-align: center; font-weight: bold;">
						<u>Certification Approval Request</u>
					  </td>
					</tr>
					<tr>
					  <td>Hi ',L.EmpName,',</td>
					</tr>
					<tr>
					  <td>
						',E.EmpName,' has successfully completed a certification course and is awaiting your approval of the results and certificate. Please review his performance and provide your feedback as soon as possible.
					  </td>
					</tr>
					<tr>
					  <tr>
							<td style="font-weight: bold;">
							  Please find the certification details below
							</td>
						  </tr>
					  <td>
						<table
						  style="
							width: 100%;
							height: 100%;
							border-spacing: 10px;
							border-top: 1px solid lightgray;
							border-bottom: 1px solid lightgray;
						  "
						>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Certification Name :</td>
			<td style="vertical-align: top;">', Concat_ws(' : ',Cl.CertificateName,Cl.CertificateCode) , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Provider :</td>
			<td style="vertical-align: top;">',Cl.Provider , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Level :</td>
			<td style="vertical-align: top;">', Cl.LEVEL , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Score :</td>
			<td style="vertical-align: top;">', C.Score , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">IssuedOn :</td>
			<td style="vertical-align: top;">', C.IssuedOn , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Expiry Date :</td>
			<td style="vertical-align: top;">', C.ExpiryDate , '</td>
		  </tr>'
		,'<tr>
                  <td style="min-width: 100px; vertical-align: top;">Certificate URL :</td>
                  <td onclick="location.href=''',C.CertificateURL,'''" ; style="color:Blue;cursor:pointer;text-decoration:underline" >View Certificate</td>
          </tr>'
		,@htmlend) as body
		from  Certifications C
		join CertificateList Cl on Cl.CertificateID=C.CertificateIdFk
		join Employee E on E.EmpId=C.EmpID
		join Employee L on L.EmpId=E.Lead
		where c.CertificationId=@CertificationID
	end

--Send A mail When a Certification is expiring
	if(upper(@Action)='CERTIFICATION_EXPIRED')
	begin
		Select 'Certification Expired' as subject
		,E.Email as toemail
		,L.Email as Ccmail
		,concat(@htmlstart, '<tr>
					  <td style="padding: 10px 0px; text-align: center; font-weight: bold;">
						<u>Certification Expired</u>
					  </td>
					</tr>
					<tr>
					  <td>Hi ',E.EmpName,',</td>
					</tr>
					<tr>
					  <td>
						Your course completion certification has expired as of today.
					  </td>
					</tr>
					<tr>
					  <tr>
							<td style="font-weight: bold;">
							  Please find the certification details below
							</td>
						  </tr>
					  <td>
						<table
						  style="
							width: 100%;
							height: 100%;
							border-spacing: 10px;
							border-top: 1px solid lightgray;
							border-bottom: 1px solid lightgray;
						  "
						>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Certification Name :</td>
			<td style="vertical-align: top;">', Concat_ws(' : ',Cl.CertificateName,Cl.CertificateCode) , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Provider :</td>
			<td style="vertical-align: top;">',Cl.Provider , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Level :</td>
			<td style="vertical-align: top;">', Cl.LEVEL , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Score :</td>
			<td style="vertical-align: top;">', C.Score , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">IssuedOn :</td>
			<td style="vertical-align: top;">', C.IssuedOn , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Expiry Date :</td>
			<td style="vertical-align: top;">', C.ExpiryDate , '</td>
		  </tr>'
		,'<tr>
                  <td style="min-width: 100px; vertical-align: top;">Certificate URL :</td>
                  <td onclick="location.href=''',C.CertificateURL,'''" ; style="color:Blue;cursor:pointer;text-decoration:underline" >View Certificate</td>
          </tr>'
		,@htmlend) as body
		from  Certifications C
		join CertificateList Cl on Cl.CertificateID=C.CertificateIdFk
		join Employee E on E.EmpId=C.EmpID
		join Employee L on L.EmpId=E.Lead
		where c.CertificationId=@CertificationID
	end

	if(upper(@Action)='CERTIFICATION_DUE')
	begin
		Select 'Certification Due' as subject
		,E.Email as toemail
		,L.Email as Ccmail
		,concat(@htmlstart, '<tr>
					  <td style="padding: 10px 0px; text-align: center; font-weight: bold;">
						<u>Certification Due</u>
					  </td>
					</tr>
					<tr>
					  <td>Hi ',E.EmpName,',</td>
					</tr>
					<tr>
					  <td>
						This mail is to remind you that your certification is due by the end of this Week. Please complete the required Certification and submit your certificate as soon as possible. 
						If you have any questions or concerns, please contact your lead.
					  </td>
					</tr>
					<tr>
					  <tr>
							<td style="font-weight: bold;">
							  Please find the certification details below
							</td>
						  </tr>
					  <td>
						<table
						  style="
							width: 100%;
							height: 100%;
							border-spacing: 10px;
							border-top: 1px solid lightgray;
							border-bottom: 1px solid lightgray;
						  "
						>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Certification Name :</td>
			<td style="vertical-align: top;">', Concat_ws(' : ',Cl.CertificateName,Cl.CertificateCode) , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Provider :</td>
			<td style="vertical-align: top;">',Cl.Provider , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Level :</td>
			<td style="vertical-align: top;">', Cl.LEVEL , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Assigned On :</td>
			<td style="vertical-align: top;">', C.CreatedOn , '</td>
		  </tr>'
		,'<tr>
			<td style="min-width: 100px; vertical-align: top;">Due Date :</td>
			<td style="vertical-align: top;">', C.DueDate , '</td>
		  </tr>'
		,'<tr>
                  <td style="min-width: 100px; vertical-align: top;">Certificate URL :</td>
                  <td onclick="location.href=''',C.CertificateURL,'''" ; style="color:Blue;cursor:pointer;text-decoration:underline" >View Certificate</td>
          </tr>'
		,@htmlend) as body
		from  Certifications C
		join CertificateList Cl on Cl.CertificateID=C.CertificateIdFk
		join Employee E on E.EmpId=C.EmpID
		join Employee L on L.EmpId=E.Lead
		where c.CertificationId=@CertificationID
	end
end
GO

