

const postgresTest = (rID) => {
  const query = 'SELECT * FROM menus WHERE restaurant_id = ' + rID;
  const start = new Date;
  pool.query(query, (err, result) => {
    const end = new Date;
    if (err) throw err;
    console.log('Operation time for Postgres to retrieve restaurant ', rID, ', ', result.rows.length, ' rows:', end - start, 'ms');
    pool.end();
  })
}
