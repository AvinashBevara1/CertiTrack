
-- =============================================

-- Author: Karthik Mediboina

-- Create date: 09/20/2023

-- Description: S Proc to Add solutions

-- LastModified:

-- =============================================
CREATE PROCEDURE [dbo].[AddSolutions] (
	@QuestionID INTEGER
	,@Answer VARCHAR(max)
	,@AnsweredBy VARCHAR(10)
	,@AnsweredOn DATETIME = NULL
	,@LastModifiedOn DATETIME = NULL
	,@Votes INTEGER = NULL
	)
AS
BEGIN
	SET @LastModifiedOn = GETDATE()
	SET @AnsweredOn = GETDATE()
	SET @Votes = 0

	INSERT INTO [dbo].[Solutions] (
		QuestionID
		,Answer
		,AnsweredBy
		,AnsweredOn
		,LastModifiedOn
		,Votes
		)
	VALUES (
		@QuestionID
		,@Answer
		,@AnsweredBy
		,@AnsweredOn
		,@LastModifiedOn
		,@Votes
		)
END
GO

