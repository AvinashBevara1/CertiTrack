-- =============================================
-- Author:	Avinash Bevara
-- Create date:       09/13/2023
-- Description:	Update a certificate in CertificateList table 
-- LastModified
-- =============================================
CREATE PROCEDURE [dbo].[UpdateCertificate] (
	@CertificateId INT
	,@CertificateName VARCHAR(150)
	,@CertificateCode VARCHAR(20)
	,@ApplyLink VARCHAR(200)
	,@Cost INT
	,@Provider VARCHAR(30)
	,@NoOfAttempts INT
	,@PassPercentage INT
	,@ValidityPeriod INT
	,@Level VARCHAR(30)
	,@ModifieddBy VARCHAR(100)
	)
AS
BEGIN
	UPDATE CertificateList
	SET CertificateName = @CertificateName
		,CertificateCode = @CertificateCode
		,ApplyLink = @ApplyLink
		,Cost = @Cost
		,Provider = @Provider
		,NoOfAttempts = @NoOfAttempts
		,PassPercentage = @PassPercentage
		,ValidityPeriod = @ValidityPeriod
		,LEVEL = @Level
		,LastModifiedBy = @ModifieddBy
		,LastModifiedOn = GETDATE()
	WHERE CertificateID = @CertificateId
END

GO

