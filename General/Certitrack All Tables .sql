CREATE DATABASE [CertiTrack]
GO

USE [CertiTrack]
GO

CREATE TABLE [CertificateList] (
    [CertificateID] INT IDENTITY(1000, 1) PRIMARY KEY
    ,[CertificateName] VARCHAR(200)
    ,[CertificateCode] VARCHAR(50)
    ,[ApplyLink] VARCHAR(MAX)
    ,[Cost] INT
    ,[Provider] VARCHAR(100)
    ,[NoOfAttempts] INT
    ,[PassPercentage] FLOAT
    ,[ValidityPeriod] INT
    ,[LEVEL] VARCHAR(30)
    ,[ApprovedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[ApprovedOn] DATETIME
    ,[CreatedOn] DATETIME DEFAULT GETDATE()
    ,[CreatedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[LastModifiedOn] DATETIME DEFAULT GETDATE()
    ,[LastModifiedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    )
GO

CREATE TABLE [Employee] (
    [EmpId] VARCHAR(10) PRIMARY KEY
    ,[EmpName] VARCHAR(100)
    ,[Email] VARCHAR(200)
    ,[Technology] VARCHAR(50)
    ,[Lead] VARCHAR(10)
    ,[WorkLocation] VARCHAR(50)
    )
GO

CREATE TABLE [Certifications] (
    [CertificationId] INT IDENTITY PRIMARY KEY
    ,[CertificateIdFk] INT FOREIGN KEY REFERENCES [CertificateList]([CertificateID])
    ,[EmpID] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[AssignedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[STATUS] VARCHAR(30)
    ,[DueDate] DATETIME
    ,[IssuedOn] DATETIME
    ,[ExpiryDate] DATETIME
    ,[Score] FLOAT
    ,[CertificateURL] VARCHAR(max)
    ,[RevokeFlag] BIT
    ,[Comments] VARCHAR(1000)
    ,[CreatedOn] DATETIME DEFAULT GETDATE()
    ,[CreatedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[ApprovedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[ApprovedOn] DATETIME
    ,[LastModifiedOn] DATETIME DEFAULT GETDATE()
    ,[LastModifiedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    )
GO

CREATE TABLE [Questionnaire] (
    [QuestionID] INT IDENTITY PRIMARY KEY
    ,[Question] VARCHAR(max)
    ,[CertificateID] INT
    ,[CreatedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[CreatedOn] DATETIME DEFAULT GETDATE()	
    ,[LastModifiedOn] [datetime] DEFAULT GETDATE()
    )
GO

CREATE TABLE [dbo].[Solutions] (
    [AnswerID] [int] IDENTITY(1, 1) PRIMARY KEY
    ,[QuestionID] [int] NULL FOREIGN KEY REFERENCES [Questionnaire]([QuestionID])
    ,[Answer] [varchar](max) NULL
    ,[AnsweredBy] [varchar](10) NULL FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[AnsweredOn] [datetime] DEFAULT GETDATE()
    ,[LastModifiedOn] [datetime] DEFAULT GETDATE()
    ,[Votes] [int] DEFAULT 0
    )
GO

GO

CREATE TABLE [CertificationsHistory] (
    [HistoryID] INT IDENTITY PRIMARY KEY
    ,[CertificationId] INT
    ,[CertificateIdFK] INT FOREIGN KEY REFERENCES [CertificateList]([CertificateID])
    ,[EmpID] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[AssignedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[STATUS] VARCHAR(30)
    ,[DueDate] DATETIME
    ,[IssuedOn] DATETIME
    ,[ExpiryDate] DATETIME
    ,[CertificateURL] VARCHAR(max)
    ,[RevokeFlag] BIT
    ,[Comments] VARCHAR(1000)
    ,[CreatedOn] DATETIME
    ,[CreatedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[ApprovedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    ,[ApprovedOn] DATETIME
    ,[LastModifiedOn] DATETIME
    ,[LastModifiedBy] VARCHAR(10) FOREIGN KEY REFERENCES [Employee]([EmpID])
    )
GO
