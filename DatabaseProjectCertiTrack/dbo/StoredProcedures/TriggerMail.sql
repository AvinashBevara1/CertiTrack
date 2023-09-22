
-- =============================================
-- Author: Avinash Bevara
-- Create date: 09/13/2023
-- Description: Proc to trigger Emails  
-- LastModified: 
-- =============================================


CREATE PROCEDURE TriggerMail
AS
BEGIN
	DECLARE @ExpCertId INT

	DROP TABLE

	IF EXISTS #TempExpiry
		SELECT CertificationId
		INTO #TempExpiry
		FROM Certifications
		WHERE cast(ExpiryDate AS DATE) = cast(getdate() AS DATE)

	DECLARE @RowCount INT = (
			SELECT COUNT(*)
			FROM #TempExpiry
			)

	WHILE @RowCount > 0
	BEGIN
		SELECT @ExpCertId = CertificationId
		FROM #TempExpiry
		ORDER BY CertificationId DESC OFFSET @RowCount - 1 ROWS

		FETCH NEXT 1 ROWS ONLY;

		EXEC GetMail @Action = 'CERTIFICATION_EXPIRED'
			,@CertificationID = @ExpCertId

		SET @RowCount -= 1;
	END

	DECLARE @DueCertId INT

	DROP TABLE

	IF EXISTS #TempDue
		SELECT CertificationId
		INTO #TempDue
		FROM Certifications
		WHERE datediff(DAY, DueDate, GETDATE()) IN (7, 3)

	DECLARE @RC INT = (
			SELECT COUNT(*)
			FROM #TempDue
			)

	WHILE @RC > 0
	BEGIN
		SELECT @DueCertId = CertificationId
		FROM #TempDue
		ORDER BY CertificationId DESC OFFSET @RC - 1 ROWS

		FETCH NEXT 1 ROWS ONLY;

		EXEC GetMail @Action = 'CERTIFICATION_DUE'
			,@CertificationID = @DueCertId

		SET @RC -= 1;
	END

END
GO

