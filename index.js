const sqlite3 = require('sqlite3').verbose();
const db_file_loc = './db2.db'

function open_db(file_name) {
    return new sqlite3.Database(file_name, (err) => {
        if (err) {
            console.log(`Failed to connect to ${file_name}`);
        }
        else {
            console.log(`Successfully connected to ${file_name}`);
        }
    })
}

function insert_company(db, data) {
    const sql_insert = `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
                        VALUES (?, ?, ? ,?, ?);`
    db.run(sql_insert, data, err => {
        if (err) {
            console.log(`ERROR: ${err}`);
        }
        else {
            console.log(`INSERTED ${data}`);
        }
    })
}

function select(db, query) {
    db.serialize(() => {
        console.log(query)
        db.each(query, (err, row) => {
            if (err) {
                console.log(`ERROR: ${err}`);
            }
            else {
                console.log(row)
            }
        })
    })
}

function close_db(db) {
    db.close(err => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log('Database connection closed!');
        }
    })
}

function update_salary_by_id(db, id, new_salary) {
    const sql_update = `UPDATE COMPANY 
                        SET SALARY = ?
                        WHERE id = ?`
   db.run(sql_update, [new_salary, id], err => {
    if(err){
        console.log(`ERROR: ${err}`);
    }
    else{
        console.log(`Salary updated to ${new_salary}`);
    }
   })                     
}

function delete_company_by_id(db, id) {
    const sql_delet = `DELETE FROM COMPANY WHERE ID = ?;`
    db.run(sql_delet, [id], err =>{
        if(err){
            console.log(`ERROR: ${err}`);
        }
        else{
            console.log(`id ${id} deleted`);
        }

    });
}

const db = open_db(db_file_loc)

setTimeout(() => insert_company(db, [8, 'DAN', 18, 'SPAIN', 32000]), 100)
setTimeout(() => delete_company_by_id(db, 7), 800)
setTimeout(() => select(db, `SELECT * FROM COMPANY`), 500)
setTimeout(() =>  update_salary_by_id(db, 2, 90000), 800);
setTimeout(() => close_db(db), 1400);



