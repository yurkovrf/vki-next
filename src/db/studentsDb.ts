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
