CREATE TABLE [CertificateList] (
	CertificateID integer identity(1000,1) primary key ,
	CertificateName varchar(200) ,
	CertificateCode varchar(50) ,
	ApplyLink varchar(MAX) ,
	Cost integer ,
	Provider varchar(100) ,
	NoOfAttempts integer ,
	PassPercentage FLOAT ,
	ValidityPeriod integer ,
	Level varchar(30) ,
	CreatedOn datetime ,
	CreatedBy varchar(10) ,
	LastUpdatedOn DATETIME ,
	LastUpdatedBy varchar(10)

)
GO
CREATE TABLE [Employee] (
	EmpId varchar(10) primary key ,
	EmpName varchar(100) ,
	Email varchar(200) ,
	Technology varchar(50) ,
	Lead varchar(10) ,
	WorkLocation varchar(50) ,
	CreatedBy varchar(10) ,
	CreatedOn datetime ,
  

)
GO

CREATE TABLE [Certifications] (
	CertificationId integer primary key ,
	CertificateIdFk integer foreign key references CertificateList(CertificateID) ,
	EmpID varchar(10) foreign key references Employee(EmpID) ,
	AssignedBy varchar(10) foreign key references Employee(EmpID) ,
	Status varchar(30) ,
	DueDate datetime ,
	IssuedOn datetime ,
	ExpiryDate datetime ,
	Score float,
	CertificateURL varchar(max) ,
	RevokeFlag Bit ,
	Comments varchar(1000) ,
	CreatedOn datetime ,
	CreatedBy varchar(10)foreign key references Employee(EmpID) ,
	ApprovedBy varchar(10) foreign key references Employee(EmpID),
	ApprovedOn datetime,
	LastModifiedOn datetime ,
	LastModifiedBy varchar(10) foreign key references Employee(EmpID)


)
GO
CREATE TABLE [Questionnaire] (
	QuestionID integer identity ,
	Question varchar(max) ,
	CertificateID integer ,
	EmpID varchar(10) foreign key references Employee(EmpID) ,
	CreatedOn datetime ,

)
GO
CREATE TABLE [Solutions] (
	AnswerID integer ,
	QuestionID integer ,
	Answer varchar(max) ,
	AnsweredBy varchar(10) foreign key references Employee(EmpID),
	AnsweredOn datetime ,
	LastUpdatedOn datetime ,
	Votes integer ,


)
GO
CREATE TABLE [CertificationsHistory] (
	HistoryID integer identity primary key ,
	CertificationId integer ,
	CertificateIdFK integer foreign key references CertificateList(CertificateID),
	EmpID varchar(10) foreign key references Employee(EmpID) ,
	AssignedBy varchar(10) foreign key references Employee(EmpID) ,
	Status varchar(30) ,
	DueDate datetime ,
	IssuedOn datetime ,
	ExpiryDate datetime ,
	CertificateURL varchar(max) ,
	RevokeFlag Bit ,
	Comments varchar(1000) ,
	CreatedOn datetime ,
	CreatedBy varchar(10) foreign key references Employee(EmpID),
	ApprovedBy varchar(10) foreign key references Employee(EmpID),
	ApprovedOn datetime,
	LastModifiedOn datetime ,
	LastModifiedBy varchar(10) foreign key references Employee(EmpID) 
  

)
GO
