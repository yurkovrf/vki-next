DROP TABLE students;
CREATE TABLE students(  
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    middleName TEXT,
    groupId INTEGER
);

ALTER TABLE students ADD uuid [text];

DELETE FROM students;
