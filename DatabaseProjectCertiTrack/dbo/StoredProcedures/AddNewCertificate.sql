

-- =============================================

-- Author: Karthik Mediboina

-- Create date: 09/20/2023

-- Description: Update Solution with type

-- LastModified:

-- =============================================


CREATE PROCEDURE [dbo].[AddNewCertificate] (
	@CertificateName VARCHAR(200)
	,@CertificateCode VARCHAR(50)
	,@ApplyLink VARCHAR(MAX)
	,@Cost INTEGER
	,@Provider VARCHAR(100)
	,@NoOfAttempts INTEGER
	,@PassPercentage FLOAT
	,@ValidityPeriod INTEGER
	,@Level VARCHAR(30)
	,@CreatedOn DATETIME = NULL
	,@CreatedBy VARCHAR(10)
	,@LastUpdatedOn DATETIME = NULL
	,@LastUpdatedBy VARCHAR(10)
	)
AS
BEGIN
	IF NOT EXISTS (
			SELECT *
			FROM CertificateList
			WHERE CertificateCode = @CertificateCode AND CertificateName = @CertificateName AND Provider = @Provider
			)
	BEGIN
		SET @CreatedOn = GETDATE()
		SET @LastUpdatedOn = GETDATE()

		INSERT INTO [dbo].[CertificateList] (
			CertificateName
			,CertificateCode
			,ApplyLink
			,Cost
			,Provider
			,NoOfAttempts
			,PassPercentage
			,ValidityPeriod
			,LEVEL
			,CreatedOn
			,CreatedBy
			,LastModifiedOn
			,LastModifiedBy
			)
		VALUES (
			@CertificateName
			,@CertificateCode
			,@ApplyLink
			,@Cost
			,@Provider
			,@NoOfAttempts
			,@PassPercentage
			,@ValidityPeriod
			,@Level
			,@CreatedOn
			,@CreatedBy
			,@LastUpdatedOn
			,@LastUpdatedBy
			)
	END
	ELSE
		SELECT 'Certification Already Exists' AS [Status]
END
GO

