-- =============================================
-- Author: Avinash Bevara
-- Create date: 09/13/2023
-- Description: Update Certification 
-- LastModified: 
-- =============================================
CREATE PROCEDURE UpdateCertification (
	@CertificationId INT
	,@Type VARCHAR(100)
	,@Status VARCHAR(100)
	,@DueDate DATETIME
	,@IssuedOn DATETIME
	,@ExpiryDate DATETIME
	,@Score FLOAT
	,@CertificateURL VARCHAR(max)
	,@Comments VARCHAR(400)
	,@UpdatedBy VARCHAR(100)
	)
AS
BEGIN
	INSERT INTO CertificationsHistory (
		CertificationId
		,CertificateIdFK
		,EmpID
		,AssignedBy
		,STATUS
		,DueDate
		,IssuedOn
		,ExpiryDate
		,CertificateURL
		,RevokeFlag
		,Comments
		,CreatedOn
		,CreatedBy
		,ApprovedBy
		,ApprovedOn
		,LastModifiedOn
		,LastModifiedBy
		)
	SELECT CertificationId
		,CertificateIdFK
		,EmpID
		,AssignedBy
		,STATUS
		,DueDate
		,IssuedOn
		,ExpiryDate
		,CertificateURL
		,RevokeFlag
		,Comments
		,CreatedOn
		,CreatedBy
		,ApprovedBy
		,ApprovedOn
		,LastModifiedOn
		,LastModifiedBy
	FROM Certifications
	WHERE CertificationId = @CertificationId

	IF (UPPER(@Type) = 'REVOKE')
	BEGIN
		UPDATE Certifications
		SET RevokeFlag = 1
			,Comments = @Comments
			,LastModifiedBy = @UpdatedBy
			,LastModifiedOn = GETDATE()
		WHERE CertificationId = @CertificationId
	END

	IF (UPPER(@Type) = 'APPROVE')
	BEGIN
		UPDATE Certifications
		SET ApprovedBy = @UpdatedBy
			,ApprovedOn = GETDATE()
			,Comments = @Comments
			,LastModifiedBy = @UpdatedBy
			,LastModifiedOn = GETDATE()
	END

	IF (UPPER(@Type) = 'DELETE')
	BEGIN
		DELETE
		FROM Certifications
		WHERE CertificationId = @CertificationId
			AND ApprovedBy IS NULL
	END
END

GO

