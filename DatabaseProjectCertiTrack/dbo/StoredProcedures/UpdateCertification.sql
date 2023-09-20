-- =============================================
-- Author: Avinash Bevara
-- Create date: 09/13/2023
-- Description: Update Certification 
-- LastModified: 
-- =============================================
CREATE PROCEDURE [dbo].[UpdateCertification] (
	@CertificationId INT
	,@Type VARCHAR(100)
	,@Status VARCHAR(100) = NULL
	,@DueDate DATETIME  = NULL
	,@IssuedOn DATETIME = NULL
	,@ExpiryDate DATETIME = NULL
	,@Score FLOAT = NULL
	,@CertificateURL VARCHAR(max) = NULL
	,@Comments VARCHAR(400)
	,@UpdatedBy VARCHAR(100)
	)
AS
BEGIN
	DECLARE @Lead VARCHAR(10) = NULL
	DECLARE @EmpID VARCHAR(10) = NULL

	SET @Lead = (SELECT Lead from Employee E INNER JOIN Certifications C ON C.EmpID = E.EmpId where C.CertificationId =  @CertificationId)
	SET @EmpID = (SELECT EmpID from Certifications C where C.CertificationId =  @CertificationId)

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
	WHERE CertificationId = @CertificationId AND @UpdatedBy IN (@Lead,@EmpID)

	
	

	IF (UPPER(@Type) = 'REVOKE')
	BEGIN
		
		UPDATE Certifications
		SET RevokeFlag = 1
			,Comments = @Comments
			,LastModifiedBy = @UpdatedBy
			,LastModifiedOn = GETDATE()
            ,[STATUS] = 'Revoked'
 		WHERE CertificationId = @CertificationId AND @UpdatedBy = @Lead
	END

	IF (UPPER(@Type) = 'APPROVE')
	BEGIN
		UPDATE Certifications
		SET ApprovedBy = @UpdatedBy
			,ApprovedOn = GETDATE()
			,Comments = @Comments
			,LastModifiedBy = @UpdatedBy
			,LastModifiedOn = GETDATE()
            ,[STATUS] = 'Approved'
		WHERE CertificationId = @CertificationId AND @UpdatedBy = @Lead
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

