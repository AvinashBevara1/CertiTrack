CREATE TABLE [dbo].[Questionnaire] (
    [QuestionID]     INT           IDENTITY (1, 1) NOT NULL,
    [Question]       VARCHAR (MAX) NULL,
    [CertificateID]  INT           NULL,
    [CreatedBy]      VARCHAR (10)  NULL,
    [CreatedOn]      DATETIME      DEFAULT (getdate()) NULL,
    [LastModifiedOn] DATETIME      DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([QuestionID] ASC),
    FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Employee] ([EmpId])
);


GO

