# NODESQLDOCKERDATA
<!-- 


install 
npm init -y 

npm install express
npm install --save-dev nodemon
npm install express mssql
npm install cors


docker new

docker pull mcr.microsoft.com/mssql/server
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=YourStrong!Passw0rd' -p 1434:1433 --name my_reesor_server_container -d mcr.microsoft.com/mssql/server
docker ps



create a data base click on new query then run this following command 

CREATE DATABASE NewDatabase;
GO
USE NewDatabase;
GO


CREATE TABLE Persons (
  PersonID INT PRIMARY KEY,
  FirstName NVARCHAR(50),
  LastName NVARCHAR(50),
  Address NVARCHAR(100),
  City NVARCHAR(50)
);
GO

INSERT INTO Persons (PersonID, FirstName, LastName, Address, City)
VALUES (1, 'John', 'Doe', '123 Elm St', 'Somewhere');
GO
SELECT * FROM Persons;
GO


fix boom error
   Get-Content server.js -Encoding Byte | Format-Hex | Select-Object -First 1
   
   (Get-Content server.js) | Set-Content -Encoding utf8 server.js
    FF FE  removed


-->