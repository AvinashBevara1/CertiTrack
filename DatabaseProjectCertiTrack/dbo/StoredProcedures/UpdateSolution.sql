
-- =============================================
-- Author: Avinash Bevara
-- Create date: 09/15/2023
-- Description: Update Solution with type 
-- LastModified: 
-- =============================================
CREATE PROCEDURE UpdateSolution (@Type VARCHAR(30), @AnswerId INTEGER, @QuestionID INT, @Answer VARCHAR(max) = NULL)
AS
BEGIN
	IF (upper(@Type) = 'VOTE')
	BEGIN
		UPDATE Solutions
		SET Votes = votes + 1, LastModifiedOn = getdate()
		WHERE AnswerID = @AnswerId
	END
	ELSE IF (upper(@Type) = 'ANSWER')
	BEGIN
		UPDATE Solutions
		SET Answer = @Answer, QuestionID = @QuestionID, LastModifiedOn = getdate()
		WHERE AnswerID = @AnswerId
	END
END
GO

