-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/14/2023
-- Description:	Proc to get the list of completed certifications 
-- LastModified
-- =============================================

CREATE  PROCEDURE [dbo].[GetCompletedCertificationsList] 
AS
BEGIN
	WITH CompletedCertificationsCTE
AS (
	SELECT DISTINCT CL.CertificateID
		,CL.Provider
		,CL.CertificateName
		,CL.CertificateCode
		,COUNT(*) AS Count
	FROM Certifications C
	LEFT JOIN CertificateList CL ON C.CertificateIdFk = CL.CertificateID
	WHERE C.STATUS = 'COMPLETED'
	GROUP BY CL.CertificateID
		,CL.Provider
		,CL.CertificateName
		,CL.CertificateCode
	)
SELECT CL.CertificateID
	,CL.Provider
	,CL.CertificateName
	,CL.CertificateCode
	,CASE WHEN CTE.COUNT IS NULL THEN 0 ELSE CTE.[Count] END Count
FROM CertificateList CL
LEFT JOIN CompletedCertificationsCTE CTE ON CL.CertificateID = CTE.CertificateID
ORDER BY CL.Provider,CTE.Count DESC
		
END

GO

