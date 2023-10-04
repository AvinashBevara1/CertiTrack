SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/18/2023
-- Description:	Proc to get the list of Certifications list based on the @EmpID 
-- LastModified: 04/10/2023 (Karthik Mediboina)
-- =============================================
ALTER PROCEDURE [dbo].[GetCertifications] (@EmpID INT,@Type VARCHAR(20))
AS
IF (UPPER(@Type) = 'SELF')
BEGIN
	SELECT CL.CertificateID
		,CONCAT (CL.CertificateName,'-',COALESCE(CL.CertificateCode, 'Not Available')) AS CertificationName
		,CL.[LEVEL]
		,E.EmpId
		,E.EmpName
		,C.Score
		,C.IssuedOn
		,C.ExpiryDate
		,CASE WHEN C.RevokeFlag = 0 THEN 'Active' ELSE 'Revoked' END AS RevokeStatus
        ,C.Comments
	FROM Certifications C
	INNER JOIN CertificateList CL ON C.CertificateIdFk = CL.CertificateID
	INNER JOIN Employee E ON C.EmpID = E.EmpId
	WHERE C.EmpID = @EmpID
END

IF (UPPER(@Type) = 'MANAGER')
BEGIN
	WITH EmployeeHierarchy
	AS (
		SELECT e.EmpId
			,e.EmpName
			,e.Lead
		FROM Employee e
		WHERE EmpId = @EmpID
		
		UNION ALL
		
		SELECT v.EmpId
			,v.EmpName
			,v.Lead
		FROM Employee v
			,EmployeeHierarchy c
		WHERE (v.Lead = c.EmpId)
		)
	-- select EmpId,EmpName  as name_in_bottom_heirarchy,LEAD from EmployeeHierarchy 
	SELECT C.CertificationId
        ,CONCAT (CL.CertificateName,'-',COALESCE(CL.CertificateCode, 'Not Available')) AS CertificationName
		,CL.[LEVEL]
		,EH.EmpId
		,EH.EmpName
		,C.Score
		,C.IssuedOn
		,C.ExpiryDate
		,CASE WHEN C.RevokeFlag = 0 THEN 'Active' ELSE 'Revoked' END AS RevokeStatus
        ,C.[STATUS]
        ,C.Comments
        ,C.ApprovedBy
        ,C.CertificateURL
	FROM Certifications C
	INNER JOIN CertificateList CL ON C.CertificateIdFk = CL.CertificateID
	INNER JOIN EmployeeHierarchy EH ON EH.EmpID = C.EmpId
END
GO
