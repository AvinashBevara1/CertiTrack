CREATE TABLE [dbo].[CertificationsHistory] (
    [HistoryID]       INT            IDENTITY (1, 1) NOT NULL,
    [CertificationId] INT            NULL,
    [CertificateIdFK] INT            NULL,
    [EmpID]           VARCHAR (10)   NULL,
    [AssignedBy]      VARCHAR (10)   NULL,
    [STATUS]          VARCHAR (30)   NULL,
    [DueDate]         DATETIME       NULL,
    [IssuedOn]        DATETIME       NULL,
    [ExpiryDate]      DATETIME       NULL,
    [CertificateURL]  VARCHAR (MAX)  NULL,
    [RevokeFlag]      BIT            NULL,
    [Comments]        VARCHAR (1000) NULL,
    [CreatedOn]       DATETIME       NULL,
    [CreatedBy]       VARCHAR (10)   NULL,
    [ApprovedBy]      VARCHAR (10)   NULL,
    [ApprovedOn]      DATETIME       NULL,
    [LastModifiedOn]  DATETIME       NULL,
    [LastModifiedBy]  VARCHAR (10)   NULL,
    PRIMARY KEY CLUSTERED ([HistoryID] ASC),
    FOREIGN KEY ([ApprovedBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([AssignedBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([CertificateIdFK]) REFERENCES [dbo].[CertificateList] ([CertificateID]),
    FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([EmpID]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([LastModifiedBy]) REFERENCES [dbo].[Employee] ([EmpId])
);


GO

