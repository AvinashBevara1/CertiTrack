
-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/15/2023
-- Description:	Proc to get the list of Certified People based on the certificateID 
-- LastModified
-- =============================================
CREATE PROCEDURE [dbo].[GetCertifiedPeople] (@CertificateID INT)
AS
BEGIN
	SELECT C.EmpID
		,E.EmpName
        ,E.Email
	FROM Certifications C
	LEFT JOIN Employee E ON C.EmpID = E.EmpId
	WHERE C.CertificateIdFk = @CertificateID

EXEC [dbo].[GetQuestions] @CertificateID

END
GO

