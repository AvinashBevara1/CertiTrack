import pyodbc

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
    # certficationsList=cursor.execute("exec GetCompletedCertificationsList")
    certficationsList=cursor.execute("select * from employee")

    # Fetch and print results
    # for row in cursor.fetchall():
    #     print(row)

    # Close the cursor and connection
    # cursor.close()
    # connection.close()

except pyodbc.Error as e:
    print(f"Error: {e}")
