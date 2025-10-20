import pgPromise from "pg-promise";

const pgp = pgPromise({
  // optional initialization options
});

const db = pgp({
  host: "sentrixdbinstance.cdykwsm8e8vj.ap-southeast-2.rds.amazonaws.com",
  port: 5432,
  database: "sentrixdb",
  user: "postgres",
  password: "postgres12345",
  ssl: {
    rejectUnauthorized: false,
    require: true, // explicitly require SSL
  },
});

export default db;
