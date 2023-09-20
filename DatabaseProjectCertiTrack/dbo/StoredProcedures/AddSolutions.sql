
-- =============================================

-- Author: Karthik Mediboina

-- Create date: 09/20/2023

-- Description: S Proc to Add solutions

-- LastModified:

-- =============================================
Create PROCEDURE [dbo].[AddSolutions] (
	@QuestionID INTEGER
	,@Answer VARCHAR(max)
	,@AnsweredBy VARCHAR(10)
	,@AnsweredOn DATETIME = NULL
	,@LastUpdatedOn DATETIME = NULL
	,@Votes INTEGER = NULL
	)
AS
BEGIN
	SET @LastUpdatedOn = GETDATE()
	SET @AnsweredOn = GETDATE()
	SET @Votes = 0

	INSERT INTO [dbo].[Solutions] (
		QuestionID
		,Answer
		,AnsweredBy
		,AnsweredOn
		,LastUpdatedOn
		,Votes
		)
	VALUES (
		@QuestionID
		,@Answer
		,@AnsweredBy
		,@AnsweredOn
		,@LastUpdatedOn
		,@Votes
		)
END
GO

