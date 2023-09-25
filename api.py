import db
import uvicorn
from fastapi import FastAPI

for i in db.certficationsList:
   print(i)
app = FastAPI()
@app.get("/home")
async def index():
   return db.certficationsList
if __name__ == "__main__":
   uvicorn.run("api:app", host="localhost", port=8000, reload=True)