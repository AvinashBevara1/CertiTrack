CREATE TABLE [dbo].[CertificateList] (
    [CertificateID]   INT           IDENTITY (1000, 1) NOT NULL,
    [CertificateName] VARCHAR (200) NULL,
    [CertificateCode] VARCHAR (50)  NULL,
    [ApplyLink]       VARCHAR (MAX) NULL,
    [Cost]            INT           NULL,
    [Provider]        VARCHAR (100) NULL,
    [NoOfAttempts]    INT           NULL,
    [PassPercentage]  FLOAT (53)    NULL,
    [ValidityPeriod]  INT           NULL,
    [LEVEL]           VARCHAR (30)  NULL,
    [ApprovedBy]      VARCHAR (10)  NULL,
    [ApprovedOn]      DATETIME      NULL,
    [CreatedOn]       DATETIME      DEFAULT (getdate()) NULL,
    [CreatedBy]       VARCHAR (10)  NULL,
    [LastModifiedOn]  DATETIME      DEFAULT (getdate()) NULL,
    [LastModifiedBy]  VARCHAR (10)  NULL,
    PRIMARY KEY CLUSTERED ([CertificateID] ASC),
    FOREIGN KEY ([ApprovedBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([LastModifiedBy]) REFERENCES [dbo].[Employee] ([EmpId])
);


GO

