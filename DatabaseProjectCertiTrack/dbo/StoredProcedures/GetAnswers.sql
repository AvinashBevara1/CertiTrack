
-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/15/2023
-- Description:	Proc to get the list of Solutions based on the QuestionID 
-- LastModified
-- =============================================
CREATE PROCEDURE [dbo].[GetAnswers] (@QuestionID INT)
AS
BEGIN
	SELECT S.QuestionID
		,S.Answer
		,E.EmpName
		,S.AnsweredOn
		,S.Votes
		,S.LastModifiedOn
	FROM Solutions S
	INNER JOIN Employee E ON S.AnsweredBy = E.EmpId
	WHERE S.QuestionID = @QuestionID
END
GO

