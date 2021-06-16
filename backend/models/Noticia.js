const db = require('../config/db').PostgresConn

class Noticia {
  constructor(nome, celular){
    this.nome = nome
    this.celular = celular
  }

  static async save(noticia){
    const conn = await db()
      conn.query(
        `INSERT INTO missionbrasil.noticias(title, description) VALUES ('${noticia.title}', '${noticia.description}')`,
        (err, res) => {
          if(err) throw(err)
        }
      );
  }

  static async getNoticias(){
    const conn = await db()

    const result = await conn.query(`SELECT * FROM missionbrasil.noticias`)
    return result
  }
}

module.exports = Noticia