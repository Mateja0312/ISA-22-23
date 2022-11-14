
import mysql, { ResultSetHeader } from 'mysql2';

export const db = (()=>{
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "LOZINKA",
        database: "ISA2022",
    })
    db.connect((err) => {
        if (err) throw err;
        console.log("Database connected!");
    });
    return db;
})();

export function queryDB(sql: string) {
    db.query(sql, (err, res: ResultSetHeader) => {
        console.log(sql);
        if (err) throw err;
        console.log(res.affectedRows ? res.affectedRows : res);
    })
}
export const dependencyOrder: any = []

export function showDB() {
    queryDB("SHOW TABLES");
    dependencyOrder.forEach((table: any) => {
        queryDB(`SELECT * FROM ${table}`)
    })
}
