const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
require('dotenv').config();

let stream = fs.createReadStream("ev_locations.csv");
let csvData = [];
let lineCount = 0; // Add this line
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    lineCount++; // Add this line
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(`Total number of lines in CSV file: ${lineCount}`); // Add this line

    // create a new connection to the database
    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PW,
        port: process.env.POSTGRES_PORT,
      });
    
    const createQuery = `
      CREATE TABLE IF NOT EXISTS ev_locations (
        Fuel_Type_Code VARCHAR(100),
        Station_Name VARCHAR(255),
        Street_Address VARCHAR(255),
        City VARCHAR(100),
        State VARCHAR(100),
        ZIP VARCHAR(20),
        Plus4 VARCHAR(20),
        Status_Code VARCHAR(20),
        Groups_With_Access_Code VARCHAR(255),
        Access_Days_Time VARCHAR(255),
        Latitude VARCHAR(20),
        Facility_Type VARCHAR(100),
        Longitude VARCHAR(20)
      )
    `;

    const copyQuery =
      "INSERT INTO ev_locations (Fuel_Type_Code, Station_Name, Street_Address, City, State, ZIP, Plus4, Status_Code, Groups_With_Access_Code, Access_Days_Time, Latitude, Facility_Type, Longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";

    pool.query(createQuery, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("Table 'ev_locations' created successfully");
      }
    });

    let count = 0;

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(copyQuery, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              count++;
              if (count % 1000 === 0) {
                console.log(`${count} rows inserted`);
              }
            }
          });
        });
      } finally {
        console.log(`${count} rows inserted in total`);

        client.query("SELECT COUNT(*) FROM ev_locations", (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log(`Total rows in table: ${res.rows[0].count}`);
          }

          done();
        });
      }
    });
  });

stream.pipe(csvStream);
