
-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/15/2023
-- Description:	Proc to get the details about a specific certificate
-- LastModified
-- =============================================
CREATE PROCEDURE [dbo].[GetCertificateDetails] (@CertificateID INT)
AS
BEGIN
SELECT 
    CONCAT (CL.CertificateName,'-',COALESCE(CL.CertificateCode, 'Not Available')) AS CertificationName
    ,CL.[LEVEL]
    ,CL.Provider
    ,CL.Cost
    ,CL.PassPercentage
    ,CL.NoOfAttempts
    ,CL.ValidityPeriod
    ,CL.ApplyLink
FROM CertificateList CL
WHERE CertificateID = @CertificateID

END
GO

