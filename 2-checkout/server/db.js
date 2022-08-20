const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))

  // Create user_accounts table
  .then(() =>
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS user_accounts \
      ( \
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, \
        user_id VARCHAR(60), \
        name VARCHAR(30), \
        email VARCHAR(30), \
        password VARCHAR(60), \
        line1 VARCHAR(50), \
        line2 VARCHAR(50), \
        city VARCHAR(30), \
        state VARCHAR(20), \
        zipcode INTEGER, \
        phone_number VARCHAR(20), \
        credit_card VARCHAR(50), \
        expiry_date VARCHAR(5), \
        cvv INTEGER, \
        billing_zip_code INTEGER \
      )"
    )
  )
  // Insert test data into db
  // .then(() => {
  //   db.queryAsync(
  //     " INSERT INTO user_accounts () \
  //       VALUES(NULL, 'Thomas_Fake_Id', 'Thomas Hepner', 'hepner.thomas@gmail.com', 'password', \
  //       '208 S 49th Street', 'no second line', 'Yakima', \
  //       'WA', 98901, '5094943965', 'credit card number', '2022-08-19', 309, 98901 \
  //       ); \
  //     "
  //   )
  // })

  .catch((err) => console.log(err));

// Post: add user data to the responses table
db.addUserAccountAsync = (userInfo) => {
  return db.queryAsync(
    " INSERT INTO user_accounts () \
      VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) \
    ",
    userInfo
  );

  // VALUES(NULL, 'Thomas_Fake_Id', 'Thomas Hepner', 'hepner.thomas@gmail.com', 'password', \
  // '208 S 49th Street', 'no second line', 'Yakima', \
  // 'WA', 98901, '5094943965', 'credit card number', '2022-08-19', 309, 98901 \
  // ); \

  // .then(() => {

  // })
  // .catch((err) => {

  // });
}

module.exports = db;

