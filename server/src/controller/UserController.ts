const dba = require("../database/connection.ts");
const RegisterUser = (req, res) => {
  const name = req.fields.name;
  const email = req.fields.email;
  const password = req.fields.password;
  const cellphone = req.fields.cellphone;
  const cpf = req.fields.cpf;
  const admin = req.fields.admin == undefined ? 0 : 1;
  const sql = `INSERT INTO users_play(name, email, password, cellphone, cpf, admin) VALUES ('${name}', '${email}', '${password}', '${cellphone}', '${cpf}', '${admin}') RETURNING *`;
  dba.connection.query(sql).then((response) => {
    res.status(201).send({ error: false, data: response.rows[0] });
    const sql2 = `INSERT INTO selective_play(id, video, status) VALUES ('${
      response.rows[0].id
    }', '${"https://youtu.be/7VurgHEknb4"}', '${null}')`;
  });
};
const DetailUser = (req, res) => {
  let id = req.params.id;
  dba.connection.query(
    `SELECT * from users_play WHERE id='${id}'`,
    (err, rows) => {
      if (rows.rows[0] == null) {
        res.json({ error: true, data: {} });
      } else {
        res.json({ error: false, data: rows.rows[0] });
      }
    }
  );
};
module.exports = {
  register: RegisterUser,
  detail: DetailUser,
};
