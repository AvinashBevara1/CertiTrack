CREATE TABLE [dbo].[Employee] (
    [EmpId]        VARCHAR (10)  NOT NULL,
    [EmpName]      VARCHAR (100) NULL,
    [Email]        VARCHAR (200) NULL,
    [Technology]   VARCHAR (50)  NULL,
    [Lead]         VARCHAR (10)  NULL,
    [WorkLocation] VARCHAR (50)  NULL,
    PRIMARY KEY CLUSTERED ([EmpId] ASC)
);


GO

