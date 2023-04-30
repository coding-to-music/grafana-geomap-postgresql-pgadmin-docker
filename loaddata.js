const { Pool } = require('pg');
require('dotenv').config();

async function runSimulation() {
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

    
    // const insertQuery = `\copy ev_locations from 'ev_locations.csv' delimiter',' CSV header`;
    // await pool.query(insertQuery);

    // const insertQuery = "COPY ev_locations FROM 'ev_locations.csv' DELIMITER ',' CSV";

    const insertQuery = "COPY ev_locations \
    FROM 'ev_locations.csv' \
    WITH (FORMAT csv, DELIMITER ',', HEADER false, QUOTE '\"')";
    
    await pool.query(insertQuery);


    // Generate a unique identifier using the current timestamp
    // const id = parseInt(Date.now());
    // const mystring = `mykey_${new Date().getTime()}`;

    // Get the current datetime in ISO format
    // const datetime = new Date().toISOString();

    // Insert a new row into the "ev_locations" table with the generated id and current datetime
    // const insertQuery = `INSERT INTO ev_locations (id, mystring, datetime) VALUES ($1, $2, $3)`;
    // const values = [id, mystring, datetime];
    // await pool.query(insertQuery, values);

    // Retrieve the value of the inserted row and print it to the console
    // const selectQuery = `SELECT * FROM ev_locations WHERE id = $1`;
    // const { rows: insertedRow } = await pool.query(selectQuery, [id]);
    // console.log(insertedRow[0]);

    // Get the number of rows in the "ev_locations" table after inserting a new row
    const countAfterQuery = 'SELECT COUNT(*) FROM ev_locations';
    const { rows: rowsAfter } = await pool.query(countAfterQuery);
    console.log(`Number of rows after: ${rowsAfter[0].count}`);

    // Retrieve all rows in the "ev_locations" table
    const selectAllQuery = 'SELECT * FROM ev_locations';
    const { rows: allRows } = await pool.query(selectAllQuery);

    // Create an array of objects representing each row
    // const rows = allRows.map(row => {
    //   return { id: row.id, datetime: row.datetime };
    // });
    // console.log(rows);

  } catch (error) {
    console.error(error);
  } finally {
    // End the connection pool
    await pool.end();
  }
}

runSimulation();