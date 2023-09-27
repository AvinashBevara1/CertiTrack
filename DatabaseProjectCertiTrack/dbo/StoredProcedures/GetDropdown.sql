
-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/14/2023
-- Description:	Proc to get the list of EmpID, Employee Name and CertificationID and CertificationName
-- LastModified
-- =============================================
CREATE PROCEDURE [dbo].[GetDropdown] @Type VARCHAR(20)
AS
IF (UPPER(@Type) = 'CERTIFICATE')
BEGIN
	SELECT CL.CertificateID
		,CL.CertificateName
	FROM CertificateList CL
	ORDER BY Provider
		,CL.CertificateName
END

IF (UPPER(@Type) = 'EMPLOYEE')
BEGIN
	SELECT E.EmpId
		,E.EmpName
	FROM Employee E
	ORDER BY EmpName
END
GO

