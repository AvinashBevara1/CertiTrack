-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/14/2023
-- Description:	Proc to get the list of completed certifications 
-- LastModified
-- =============================================

CREATE  PROCEDURE [dbo].[GetCompletedCertificationsList] 
AS
BEGIN
	SELECT DISTINCT CL.CertificateID
		,CL.Provider
		,CL.CertificateName
		,CL.CertificateCode
		,COUNT(*) AS count
	FROM Certifications C 
	LEFT JOIN CertificateList CL ON C.CertificateIdFk = CL.CertificateID
	WHERE C.STATUS = 'COMPLETED'
	GROUP BY CL.CertificateID
		,CL.Provider
		,CL.CertificateName
		,CL.CertificateCode
		
END

GO

