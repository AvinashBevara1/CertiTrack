
-- =============================================
-- Author:	Ravi Varma Yalamanchili
-- Create date:       09/15/2023
-- Description:	Proc to get the list of Reportees for the lead 
-- LastModified
-- =============================================
CREATE PROCEDURE [dbo].[GetReportees] (@EmpID INT)
AS
BEGIN
WITH EmployeeHierarchy AS (
    SELECT EmpId, EmpName
    FROM Employee
    WHERE Lead = @EmpID -- Replace 'NULL' with the manager's EmpId you're interested in
    UNION ALL
    SELECT e.EmpId, e.EmpName
    FROM Employee e
    INNER JOIN EmployeeHierarchy eh ON e.Lead = eh.EmpId
)
SELECT EmpId + ' - ' + EmpName AS ReporteeName
FROM EmployeeHierarchy;

END
GO

