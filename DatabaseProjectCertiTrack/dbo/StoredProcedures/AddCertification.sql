
-- =============================================
-- Author: Karthik Mediboina
-- Create date: 09/20/2023
-- Description: Adding the certification of individual employee
-- LastModified:
-- =============================================
CREATE PROCEDURE [dbo].[AddCertification] (
	@CertificateIdFk INT
	,@EmpID VARCHAR(10)
	,@AssignedBy VARCHAR(10)
	,@STATUS VARCHAR(30)
	,@DueDate DATE = NULL
	,@IssuedOn DATE = NULL
	,@ExpiryDate DATE = NULL
	,@Score FLOAT = NULL
	,@CertificateURL VARCHAR(max) = NULL
	,@RevokeFlag BIT = NULL
	,@Comments VARCHAR(100)
	,@CreatedOn DATE = NULL
	,@CreatedBy VARCHAR(10)
	,@ApprovedBy VARCHAR(10) = NULL
	,@ApprovedOn DATE = NULL
	,@LastModifiedOn DATE = NULL
	,@LastModifiedBy VARCHAR(10) = NULL
	)
AS
BEGIN
	IF NOT EXISTS (
			SELECT *
			FROM Certifications
			WHERE @CertificateIdFk = CertificateIdFk AND @EmpID = EmpID AND UPPER(STATUS) != 'EXPIRED'
			)
	BEGIN
		SET @CreatedOn = GETDATE()
		SET @LastModifiedOn = GETDATE()
		SET @STATUS = CASE WHEN @STATUS IS NULL OR @STATUS = '' THEN 'In-Progress' ELSE @STATUS END

		INSERT INTO [dbo].[Certifications] (
			CertificateIdFk
			,EmpID
			,AssignedBy
			,STATUS
			,DueDate
			,IssuedOn
			,ExpiryDate
			,Score
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
		VALUES (
			@CertificateIdFk
			,@EmpID
			,@AssignedBy
			,@STATUS
			,@DueDate
			,@IssuedOn
			,@ExpiryDate
			,@Score
			,@CertificateURL
			,@RevokeFlag
			,@Comments
			,@CreatedOn
			,@CreatedBy
			,@ApprovedBy
			,@ApprovedOn
			,@LastModifiedOn
			,@LastModifiedBy
			)
	END
END
GO

