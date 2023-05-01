const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

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

    const copyQuery = `COPY ev_locations FROM STDIN WITH (FORMAT csv, DELIMITER ',', HEADER false, QUOTE '"')`;

    // const query =
    //   "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)";

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
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