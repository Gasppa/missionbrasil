const db = require('../config/db').PostgresConn

class Usuario {
  constructor(nome, celular){
    this.nome = nome
    this.celular = celular
  }

  static async save(user){
    const conn = await db()
      conn.query(
        `INSERT INTO missionbrasil.usuarios(username, password, role) VALUES ('${user.username}', '${user.password}', '${user.role}')`,
        (err, res) => {
          conn.release()
          if(err) throw(err)
        }
      );
  }

  static async getUser(user){
    const conn = await db()

    const result = await conn.query(`SELECT * FROM missionbrasil.usuarios where username = $1 AND password = $2;`, [user.username, user.password])
    conn.release()
    return result
  }
}

module.exports = Usuario