'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Students.module.scss';
import useStudents from '@/hooks/useStudents';
import StudentInterface from '@/types/StudentInterface';
import Student from './Student/Student';

const Students = (): React.ReactElement => {
    const { students, deleteStudentMutate } = useStudents();
    
    const onDeleteHandler = (studentId: number): void => {
        deleteStudentMutate(studentId)
    };

    return (
        <div className={styles["students"]}>
        {students.map((student: StudentInterface) => (
            <Student key={student.id} student={student} onDelete={onDeleteHandler} />
        ))}
        </div>
    );
};

export default Students;
