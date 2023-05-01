const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
require('dotenv').config();

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ev_locations (
    id SERIAL PRIMARY KEY,
    Fuel_Type_Code VARCHAR(255) NOT NULL,
    Station_Name VARCHAR(255) NOT NULL,
    Street_Address VARCHAR(255) NOT NULL,
    City VARCHAR(255) NOT NULL,
    State VARCHAR(255) NOT NULL,
    ZIP VARCHAR(255) NOT NULL,
    Plus4 VARCHAR(255),
    Status_Code VARCHAR(255),
    Groups_With_Access_Code VARCHAR(255),
    Access_Days_Time VARCHAR(255),
    Latitude NUMERIC,
    Facility_Type VARCHAR(255),
    Longitude NUMERIC
  )
`;

let stream = fs.createReadStream("ev_locations.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PW,
      port: process.env.POSTGRES_PORT,
    });

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        // Create table if it doesn't exist
        client.query(createTableQuery, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log("Table ev_locations created successfully");
          }
        });

        let count = 0;
        const batchSize = 1000;

        // Loop through rows and insert in batches
        while (csvData.length > 0) {
          const batch = csvData.splice(0, batchSize);
          const values = batch.map(row => `('${row.join("','")}')`).join(',');
          const query = `INSERT INTO ev_locations (Fuel_Type_Code, Station_Name, Street_Address, City, State, ZIP, Plus4, Status_Code, Groups_With_Access_Code, Access_Days_Time, Latitude, Facility_Type, Longitude) VALUES ${values}`;

          client.query(query, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              count += res.rowCount;
              if (count % batchSize === 0) {
                console.log(`Inserted ${count} rows`);
              }
            }
          });
        }
      } finally {
        done();
        console.log(`Inserted ${count} total rows`);
        pool.query('SELECT COUNT(*) FROM ev_locations', (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            console.log(`Total rows in ev_locations table: ${res.rows[0].count}`);
          }
          pool.end();
        });
      }
    });
  });

stream.pipe(csvStream);
