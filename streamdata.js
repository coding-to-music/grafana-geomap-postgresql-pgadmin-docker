const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
require('dotenv').config();

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
    
    // const pool = new Pool({
    //   host: "localhost",
    //   user: "postgres",
    //   database: "testdb",
    //   password: "123",
    //   port: 5432
    // });

    // const copyQuery = `COPY ev_locations FROM STDIN WITH (FORMAT csv, DELIMITER ',', HEADER false, QUOTE '"')`;

    // const query =
    //   "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)";

    // Fuel_Type_Code, Station_Name, Street_Address, City, State, ZIP, Plus4, Status_Code, Groups_With_Access_Code, Access_Days_Time, Latitude, Facility_Type, Longitude

    const copyQuery =
      "INSERT INTO ev_locations (Fuel_Type_Code, Station_Name, Street_Address, City, State, ZIP, Plus4, Status_Code, Groups_With_Access_Code, Access_Days_Time, Latitude, Facility_Type, Longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(copyQuery, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);