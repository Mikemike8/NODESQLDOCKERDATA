// Import necessary packages
const express = require('express');
const path = require('path');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 3000; // Choose the port where your server will run

// Enable CORS
app.use(cors());

// Define your database connection configuration
const config = {
  user: 'sa', // Your SQL Server username
  password: 'YourStrong!Passw0rd', // Your SQL Server password
  server: 'localhost', // Use 'localhost' or '127.0.0.1'
  port: 1434, // whatever port you're using (check your Docker config if needed)
  database: 'NewDatabase', // Database name (can be 'master' or your specific DB name)
  options: {
    encrypt: true, // If connecting to Azure or a secured SQL Server
    trustServerCertificate: true // For testing, disable SSL verification
  }
};

// Function to query the database
async function getData() {
  try {
    // Connect to the SQL Server database
    await sql.connect(config);
    
    // Run a query to select from the Debtors table
    const result = await sql.query`SELECT DebtorID, FirstName, LastName, AmountOwed, Rank FROM Debtors`; // Query your table

    // Return the result to the client (if needed)
    return result.recordset; // Return the result set containing the rows
  } catch (err) {
    // Handle any errors
    console.error('Error executing query:', err);
    throw err; // Rethrow the error to be handled later in the route
  } finally {
    // Close the connection
    await sql.close();
  }
}

// Define a simple route to show the data
app.get('/data', async (req, res) => {
  try {
    const data = await getData(); // Call the function to get data
    res.json(data); // Send the result as a JSON response
  } catch (err) {
    res.status(500).send('Error occurred while fetching data');
  }
});

// Serve the index.html file directly from the root of the project
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html from the project root
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/data`);
});
