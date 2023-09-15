
-- =============================================
-- Author: Avinash Bevara
-- Create date: 09/15/2023
-- Description: Update Question 
-- LastModified: 
-- =============================================
CREATE PROCEDURE UpdateQuestion (@QuestionID INTEGER, @Question VARCHAR(max), @CertificateID INT)
AS
BEGIN
	UPDATE [dbo].[Questionnaire]
	SET Question = @Question, CertificateID = @CertificateID, LastModifiedOn = getdate()
	WHERE QuestionID = @QuestionID
END
GO

