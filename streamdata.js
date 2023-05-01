const fs = require("fs");
const { Pool } = require("pg");
const fastcsv = require("fast-csv");
require('dotenv').config();

let stream = fs.createReadStream("ev_locations.csv");
// let stream = fs.createReadStream("junk-2.csv");
let csvData = [];
let lineCount = 0;
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    lineCount++;
    csvData.push(data);
  })
  .on("end", function() {
    console.log(`Total number of lines in CSV file: ${lineCount}`);

    // create a new connection to the database
    const pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PW,
      port: process.env.POSTGRES_PORT,
    });

    const dropRecreateQuery = `
      BEGIN;
      DROP TABLE IF EXISTS ev_locations;
      CREATE TABLE ev_locations (
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
        Latitude DECIMAL(20, 10),
        Longitude DECIMAL(20, 10),
        Facility_Type VARCHAR(100)
      );
      COMMIT;
    `;

    const copyQuery =
      "INSERT INTO ev_locations (Fuel_Type_Code, Station_Name, Street_Address, City, State, ZIP, Plus4, Status_Code, Groups_With_Access_Code, Access_Days_Time, Latitude, Longitude, Facility_Type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";

    pool.query(dropRecreateQuery, (err, res) => {
      if (err) {
        console.log(err.stack);
        return;
      } else {
        console.log("Table 'ev_locations' dropped and recreated successfully");
      }
    });

    let count = 0;
    let errorCount = 0;

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach((row, rowIndex) => {
          client.query(copyQuery, row, (err, res) => {
            if (err) {
              console.log(`Error on row ${rowIndex+1}: ${err.message}`);
              const targetColumnName = Object.keys(err.fields || {}).find(key => err.fields[key] !== undefined);
              console.log(`Offending row for ${targetColumnName}:`);
              console.log(row);
              errorCount++;
            } else {
              count++;
              if (count % 5000 === 0) {
                console.log(`${count} rows inserted`);
              }
            }
          });
        });
      } finally {
        client.query("SELECT COUNT(*) FROM ev_locations", (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log(`Total rows in table: ${res.rows[0].count}`);
            console.log(`${count} rows inserted in total`);
            console.log(`${errorCount} rows had errors`);
          }

          done();
        });
      }
    });
  });

stream.pipe(csvStream);
