# Setting Up a Node.js Project with SQL Server in Docker

## Step 1: Initialize Your Node.js Project

### 1. Initialize a new Node.js project:
Open your terminal in the project directory and run the following command:
```bash




npm init -y




2. Install Required Dependencies:
Install the necessary packages:


npm install express
npm install --save-dev nodemon
npm install mssql
npm install cors



express: To create the Node.js server.


nodemon: For automatically restarting the server during development.


mssql: To interact with SQL Server from Node.js.


cors: To handle Cross-Origin Resource Sharing issues when making requests from the frontend.





Step 2: Run SQL Server in Docker

1. Pull the SQL Server Docker image:
Run the following command to pull the Microsoft SQL Server image from Docker Hub:

docker pull mcr.microsoft.com/mssql/server

2. Run the SQL Server container:
Start the SQL Server container with the following command. This will set the SA password and accept the EULA:


docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=YourStrong!Passw0rd' -p 1434:1433 --name my_reesor_server_container -d mcr.microsoft.com/mssql/server



-p 1434:1433: Maps port 1433 inside the container to port 1434 on your local machine.

--name my_reesor_server_container: Specifies the name of your container.

-d: Runs the container in detached mode (background).

3. Verify the running container:
To confirm that the container is running, use:


docker ps



You should see something like:


CONTAINER ID   IMAGE                             COMMAND                  CREATED          STATUS          PORTS              NAMES
aafe0d2170e9   mcr.microsoft.com/mssql/server    "/opt/mssql/bin/laun…"   24 minutes ago   Up 24 minutes   0.0.0.0:1434->1433/tcp   sql_server_container
Step 3: Create the Database and Table
1. Connect to SQL Server:
Use a SQL client like Azure Data Studio, SQL Server Management Studio (SSMS), or sqlcmd to connect to your SQL Server container:

Host: localhost

Port: 1434

Username: sa

Password: YourStrong!Passw0rd

2. Create the NewDatabase:
Once connected, run the following SQL commands to create the database and switch to it:


CREATE DATABASE NewDatabase;
GO
USE NewDatabase;
GO
3. Create the Persons table:
Run the following query to create the Persons table:

DROP TABLE IF EXISTS Persons;


-- Create the new table without Rank column initially
CREATE TABLE Debtors (
    DebtorID INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    AmountOwed DECIMAL(18, 2)
);







-- Insert data into the table
INSERT INTO Debtors (FirstName, LastName, AmountOwed)
VALUES
    ('John', 'Doe', 5000.00),
    ('Jane', 'Smith', 12000.50),
    ('Alex', 'Johnson', 8500.00),
    ('Emily', 'Davis', 6000.75),
    ('Michael', 'Brown', 15000.00);

-- Add Rank column after inserting data
ALTER TABLE Debtors ADD Rank INT;

-- Update the Rank column based on AmountOwed (highest to lowest)
WITH RankedData AS (
    SELECT 
        DebtorID,
        ROW_NUMBER() OVER (ORDER BY AmountOwed DESC) AS Rank
    FROM Debtors
)
UPDATE Debtors
SET Rank = RankedData.Rank
FROM Debtors
JOIN RankedData ON Debtors.DebtorID = RankedData.DebtorID;

-- Select all data to verify the results
SELECT * FROM Debtors;





Additional Notes:
Ensure that your SQL Server container is running and accessible through port 1434.

Update the database connection details if your SQL Server instance uses different credentials or ports.

Use nodemon during development to automatically restart the server when you make changes to your code.

yaml
Copy

---

This Markdown format will allow you to provide clear, step-by-step instructions in a `.md` file for users to easily follow and set up the project with Docker and SQL Server.




<!--

fix boom error
   Get-Content server.js -Encoding Byte | Format-Hex | Select-Object -First 1
   
   (Get-Content server.js) | Set-Content -Encoding utf8 server.js
    FF FE  removed


-->
