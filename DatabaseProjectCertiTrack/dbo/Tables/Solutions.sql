CREATE TABLE [dbo].[Solutions] (
    [AnswerID]       INT           IDENTITY (1, 1) NOT NULL,
    [QuestionID]     INT           NULL,
    [Answer]         VARCHAR (MAX) NULL,
    [AnsweredBy]     VARCHAR (10)  NULL,
    [AnsweredOn]     DATETIME      DEFAULT (getdate()) NULL,
    [LastModifiedOn] DATETIME      DEFAULT (getdate()) NULL,
    [Votes]          INT           DEFAULT ((0)) NULL,
    PRIMARY KEY CLUSTERED ([AnswerID] ASC),
    FOREIGN KEY ([AnsweredBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([QuestionID]) REFERENCES [dbo].[Questionnaire] ([QuestionID])
);


GO

