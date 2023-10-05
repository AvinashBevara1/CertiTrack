# import db
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date
import datetime
from typing import Optional
import pyodbc
# import pandas as pd

# Define the connection string
server = 'TGU1DELL0091'
database = 'certitrack'
username = 'sa'
password = 'Dbase@123'

# Create the connection string
connection_string = f'DRIVER=ODBC Driver 17 for SQL Server;SERVER={server};DATABASE={database};UID={username};PWD={password}'

try:
    # Establish the database connection
    connection = pyodbc.connect(connection_string)

    # Create a cursor
    cursor = connection.cursor()

    # Example: Execute a SQL query
    certficationsList=cursor.execute("exec GetCompletedCertificationsList").fetchall()

    LeadList=cursor.execute("select distinct lead from employee").fetchall()

   
except pyodbc.Error as e:
    print(f"Error: {e}")

class certificaterequest(BaseModel):
   certificateID:int

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
@app.get("/certifications")
async def index():
   result = [{"certificateid": row.CertificateID, "certificatename": row.CertificateName,"count":row.Count,"provider":row.Provider} for row in certficationsList]
   return {"certifications":result}
   # return {"message":"hello world"}

@app.get("/lead")
async def index():
   leadids=[]
   print (LeadList)
   for i in LeadList:
       leadids.append(str(i[0]))
   return {"lead":leadids}
   # return {"message":"hello world"}




@app.post("/getcertifiedpeople")
async def index(input_param:certificaterequest):
   query = f"exec getcertifiedpeople ?"
   print(input_param.certificateID)
   # values = {"param": certificateID}
   result =cursor.execute(query, (input_param.certificateID))
   result=result.fetchall()
   # print(result)
   result = [{"employeeid": row.EmpID, "employeename": row.EmpName,"email":row.Email} for row in result]
   return {"certifiedpeople":result}

class CertificateEntry(BaseModel):
    CertificateID: int
    EmpID: str
    AssignedBy: str
    CreatedBy:str
    Status: str
    IssuedOn: Optional[datetime.date] = None
    ExpiryDate: Optional[datetime.date] = None
    DueDate: Optional[datetime.date] = None
    Score: Optional[float] = None
    CertificateURL: Optional[str] = None
    Comments: Optional[str] = None
    # RevokeFlag: bool

@app.post("/submit-certificate")
async def submit_certificate(data: CertificateEntry):
    cursor.execute("exec Addcertification @certificateIDfk=?, @empID=?, @assignedby=?,@createdby=?,@comments=?,@duedate=?,@issuedon=?,@expirydate=?,@certificateurl=?,@score=?,@status=?", (data.CertificateID, data.EmpID,data.AssignedBy,data.CreatedBy,data.Comments,data.DueDate,data.IssuedOn,data.ExpiryDate,data.CertificateURL,data.Score,data.Status))
    connection.commit()


@app.get("/get-reportees/{EmpID}")
async def getreporteesdropdown(EmpID: str):
    cursor.execute("exec getreportees ?", (EmpID,))
    reportees = cursor.fetchall()
    reporteesdata = []

    for emp in reportees:
        data = {
            "EmpId": emp.EmpId,  # Include QuestionID
            "EmpName": emp.ReporteeName,
        }
        reporteesdata.append(data)

    return reporteesdata
   


@app.get("/get-qa-data/{certificateID}")
async def get_qa_data(certificateID: int):
    # Create a cursor to execute SQL queries

    # Execute the GetQuestions stored procedure
    cursor.execute("exec GetQuestions ?", (certificateID,))
    questions = cursor.fetchall()

    qa_data = []

    for question in questions:
        question_data = {
            "QuestionID": question.QuestionID,  # Include QuestionID
            "Question": question.Question,
            "EmpName": question.EmpName,  # Include EmpName
            "CreatedOn": question.CreatedOn,  # Include CreatedOn
            "LastModifiedOn": question.LastModifiedOn,  # Include LastModifiedOn
            "answers": []
        }

        # Execute the GetAnswers stored procedure for each question
        cursor.execute("exec GetAnswers ?", (question.QuestionID,))
        answers = cursor.fetchall()

        for answer in answers:
                answer_id,quesID, answer_text, emp_name, answered_on, votes, last_modified_on = answer
                question_data["answers"].append({
                    "AnswerID": answer_id,
                    "QuestionID": quesID,
                    "Answer": answer_text,
                    "EmpName": emp_name,
                    "AnsweredOn": answered_on,
                    "Votes": votes,
                    "LastModifiedOn": last_modified_on
                })
        

        qa_data.append(question_data)

    return qa_data


class AddQuestionRequest(BaseModel):
    question: str
    certificateID: int
    empID: str
  

@app.post("/add-question")
async def add_question(data:AddQuestionRequest):
      # Execute the AddQuestion stored procedure
      cursor.execute("set NOCOUNT ON; declare @maxid int ;exec AddQuestion @question=?, @certificateID=?, @empID=?, @maxid =@maxid OUTPUT;select @maxid as maxid", (data.question, data.certificateID, data.empID))
      maxID = cursor.fetchone()
      print(maxID[0])
    # Commit the transaction
      connection.commit()

    # Return the maxID value
      return {"maxid": maxID[0]}

      


class AddAnswerRequest(BaseModel):
    questionID: int
    answer: str
    answeredby: str

@app.post("/add-answer")
async def add_answer(data:AddAnswerRequest):

        cursor.execute("exec AddSolutions @questionId=?, @answer=?,@AnsweredBy=?", (data.questionID, data.answer, data.answeredby))
        connection.commit()

        return {"message": "Answer added successfully"}



@app.get("/get-emp-certificates/{EmpID}/{Type}")
async def GetEmpCertificate(EmpID: str,Type: str):
    cursor.execute("exec GetCertifications @EmpId = ?, @Type = ?", (EmpID,Type,))
    TotalCertifications = cursor.fetchall()
    ReporteesCertification= []

    for cer in TotalCertifications:
        data = {
            "CertificationID":cer.CertificationId,
            "CertificationName": cer.CertificationName,  # Include QuestionID
            "Level": cer.LEVEL,
            "EmpId":cer.EmpId,
            "EmpName":cer.EmpName,
            "Score":cer.Score,
            "IssuedOn":cer.IssuedOn,
            "ExpiryDate":cer.ExpiryDate,
            "RevokeStatus":cer.RevokeStatus,
            "Status":cer.STATUS,
            "Comments":cer.Comments,
            "ApprovedBy":cer.ApprovedBy,    
        }

        ReporteesCertification.append(data)

    return ReporteesCertification

class UpdateCertification(BaseModel):
    CertificationID: int
    Type:str
    Status:str
    Comments: str
    UpdatedBy: str 

class UpdateCertification(BaseModel):
    CertificationId: int
    Type:str
    Status:str
    Comments: str
    UpdatedBy: str 

@app.post("/update-certification/")
async def getreporteesdropdown(data:UpdateCertification):
    print(data)
    cursor.execute("exec UpdateCertification @CertificationId = ?, @Type = ?, @Status = ?, @Comments = ?, @UpdatedBy = ?", (data.CertificationId,data.Type,data.Status,data.Comments,data.UpdatedBy))
    connection.commit()
    return ''

class CompleteCertification(BaseModel):
    CertificationId: int
    Type:str
    Comments: str
    IssuedOn: date
    ExpiryDate: date
    Score: float
    CertificateUrl : str
    UpdatedBy: str 

@app.post("/complete-certification/")
async def getreporteesdropdown(data:CompleteCertification):
    print(data)
    cursor.execute("exec UpdateCertification @CertificationId = ?, @Type = ?, @Comments = ?, @UpdatedBy = ?,@IssuedOn=?,@ExpiryDate=?,@CertificateUrl=?,@Score=?", (data.CertificationId,data.Type,data.Comments,data.UpdatedBy,data.IssuedOn,data.ExpiryDate,data.CertificateUrl,data.Score))
    connection.commit()
    return ''



if __name__ == "__main__":
   uvicorn.run("api:app", host="localhost", port=8000, reload=True)