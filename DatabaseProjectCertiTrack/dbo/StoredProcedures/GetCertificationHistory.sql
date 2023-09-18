
-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/15/2023
-- Description:	Proc to get the certificate history
-- LastModified
-- =============================================
CREATE PROCEDURE [dbo].[GetCertificationHistory] (@CertificateID INT, @EmpID VARCHAR(10))
AS
BEGIN
SELECT 
    CONCAT (CL.CertificateName,'-',COALESCE(CL.CertificateCode, 'Not Available')) AS CertificationName
		,CL.[LEVEL]
		,E.EmpId
		,E.EmpName
		,CH.IssuedOn
		,CH.ExpiryDate
		,CASE WHEN CH.RevokeFlag = 0 THEN 'Active' ELSE 'Revoked' END AS RevokeStatus
        ,CH.Comments
        ,CH.[STATUS]
FROM CertificationsHistory CH
INNER JOIN CertificateList CL ON CH.CertificateIdFK = CL.CertificateID
INNER JOIN Employee E ON E.EmpId = CH.EmpID
WHERE CH.CertificateIdFK = @CertificateID
    AND CH.EmpID = @EmpID

END
GO

