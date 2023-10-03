
-- =============================================
-- Author: Karthik Mediboina
-- Create date: 09/20/2023
-- Description: Update Solution with type
-- LastModified:
-- =============================================
CREATE PROCEDURE [dbo].[AddQuestion] (
	@Question VARCHAR(max)
	,@CertificateID INTEGER
	,@EmpID VARCHAR(10)
	,@CreatedOn DATETIME = NULL
	,@maxid int output
	)
AS
BEGIN
	IF NOT EXISTS (
			SELECT *
			FROM Questionnaire
			WHERE Question = @Question
			)
	BEGIN
		SET @CreatedOn = GETDATE()

		INSERT INTO [dbo].[Questionnaire] (
			Question
			,CertificateID
			,CreatedBy
			,CreatedOn
			)
		VALUES (
			@Question
			,@CertificateID
			,@EmpID
			,@CreatedOn
			)

	
	select @maxid=max(QuestionID) from Questionnaire
	SELECT @maxid AS maxid;
	END

 END
GO

