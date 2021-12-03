const db = require("../database/connection.ts");

const DetailSelective = (req, res) => {
  const id = req.params.id;
  db.connection.query(
    `SELECT * from selective_play WHERE id='${id}'`,
    (err, rows) => {
      if (rows.rows[0] == null) {
        res.json({ error: true, data: {} });
      } else {
        res.json({ error: false, data: rows.rows[0] });
      }
    }
  );
};
const ListSelective = (req, res) => {
  db.connection.query(
    `SELECT * from selective_play WHERE status IS NULL`,
    (err, rows) => {
      res.json({ error: false, data: rows.rows });
    }
  );
};
const UpdateSelective = (req, res) => {
  const result = req.fields.result;
  const id = req.params.id;
  const sql = `UPDATE selective_play SET status = '${result}' WHERE id = '${id}' RETURNING *`;
  db.connection.query(sql).then((response) => {
    res.status(201).send({ error: false, data: response.rows[0] });
  });
};
module.exports = {
  detail: DetailSelective,
  list: ListSelective,
  update: UpdateSelective,
};
