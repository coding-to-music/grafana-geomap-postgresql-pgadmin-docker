const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

async function runLoadData() {
    // Create a new Pool object to handle connections to Postgres
    const pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PW,
      port: process.env.POSTGRES_PORT,
    });
  
    try {
      // Create the "ev_locations" table if it doesn't already exist
      const createTableQuery = `CREATE TABLE IF NOT EXISTS ev_locations
        (
        Fuel_Type_Code           varchar(400) NULL,
        Station_Name             varchar(400) NULL,
        Street_Address           varchar(400) NULL,
        City                     varchar(400) NULL,
        State                    varchar(400) NULL,
        ZIP                      varchar(400) NULL,
        Plus4                    varchar(400) NULL,
        Status_Code              varchar(400) NULL,
        Groups_With_Access_Code  varchar(400) NULL,
        Access_Days_Time         varchar(400) NULL,
        Latitude                 varchar(400) NULL,
        Facility_Type            varchar(400) NULL,
        Longitude                varchar(400) NULL
        )`;
      await pool.query(createTableQuery);
  
      // Get the number of rows in the "ev_locations" table before inserting a new row
      const countBeforeQuery = 'SELECT COUNT(*) FROM ev_locations';
      const { rows: rowsBefore } = await pool.query(countBeforeQuery);
      console.log(`Number of rows before: ${rowsBefore[0].count}`);
  
      const filePath = './ev_locations.csv';
  
      const copyQuery = `COPY ev_locations FROM '${filePath}' WITH (FORMAT csv, DELIMITER ',', HEADER false, QUOTE '"')`;
  
      const data = await fs.promises.readFile(filePath);
  
      await pool.query(copyQuery, [data]);
  
      console.log('Copy command successful');
  
      // Get the number of rows in the "ev_locations" table after inserting a new row
      const countAfterQuery = 'SELECT COUNT(*) FROM ev_locations';
      const { rows: rowsAfter } = await pool.query(countAfterQuery);
      console.log(`Number of rows after: ${rowsAfter[0].count}`);
  
      // Retrieve all rows in the "ev_locations" table
      // const selectAllQuery = 'SELECT * FROM ev_locations';
      // const { rows: allRows } = await pool.query(selectAllQuery);
  
    } catch (error) {
      console.error(error);
    // } finally {
    //   // End the connection pool
    //   await pool.end();
    }
  }
  
  runLoadData();
  