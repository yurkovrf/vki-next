import sqlite3 from 'sqlite3';

import StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
    const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

    const students = await new Promise((resolve, reject) => {
        const sql = 'select * from students';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                db.close();
                return;
            }
            resolve(rows);
            db.close();
        });
    });

    return students as StudentInterface[];
};

export const deleteStudentDb = async (studentId: number): Promise<number> => {
    const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

    const deleted = await new Promise((resolve, reject) => {
        const sql = `delete from students where id = ${studentId}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                db.close();
                return;
            }
            resolve(rows);
            db.close();
        })
    });

    return studentId;
}

export const addStudentDb = async (first_name: string, last_name: string, middle_name: string, groupId: number): Promise<number> => {
    const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

    const studentId: number = await new Promise((resolve, reject) => {
        const sql = `insert into students (first_name, last_name, middle_name, groupId) values (?, ?, ?, ?)`;
        db.run(sql, [first_name, last_name, middle_name, groupId], function(err) {
            if (err) {
                reject(err);
                db.close();
                return;
            }
            resolve(this.lastID);
            db.close();
        })
    });

    return studentId;
}

