CREATE TABLE [dbo].[Certifications] (
    [CertificationId] INT            IDENTITY (1, 1) NOT NULL,
    [CertificateIdFk] INT            NULL,
    [EmpID]           VARCHAR (10)   NULL,
    [AssignedBy]      VARCHAR (10)   NULL,
    [STATUS]          VARCHAR (30)   NULL,
    [DueDate]         DATETIME       NULL,
    [IssuedOn]        DATETIME       NULL,
    [ExpiryDate]      DATETIME       NULL,
    [Score]           FLOAT (53)     NULL,
    [CertificateURL]  VARCHAR (MAX)  NULL,
    [RevokeFlag]      BIT            NULL,
    [Comments]        VARCHAR (1000) NULL,
    [CreatedOn]       DATETIME       DEFAULT (getdate()) NULL,
    [CreatedBy]       VARCHAR (10)   NULL,
    [ApprovedBy]      VARCHAR (10)   NULL,
    [ApprovedOn]      DATETIME       NULL,
    [LastModifiedOn]  DATETIME       DEFAULT (getdate()) NULL,
    [LastModifiedBy]  VARCHAR (10)   NULL,
    PRIMARY KEY CLUSTERED ([CertificationId] ASC),
    FOREIGN KEY ([ApprovedBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([AssignedBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([CertificateIdFk]) REFERENCES [dbo].[CertificateList] ([CertificateID]),
    FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([EmpID]) REFERENCES [dbo].[Employee] ([EmpId]),
    FOREIGN KEY ([LastModifiedBy]) REFERENCES [dbo].[Employee] ([EmpId])
);


GO

