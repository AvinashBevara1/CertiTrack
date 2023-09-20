
-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/15/2023
-- Description:	Proc to get the list of Questions based on the certificateID 
-- LastModified
-- =============================================
CREATE PROCEDURE [dbo].[GetQuestions] (@CertificateID INT)
AS
BEGIN
	SELECT Q.QuestionID
		,Q.Question
		,E.EmpName
		,Q.CreatedOn
		,Q.LastModifiedOn
	FROM Questionnaire Q
	INNER JOIN Employee E ON Q.CreatedBy = E.EmpId
	WHERE Q.CertificateID = @CertificateID
END
GO

