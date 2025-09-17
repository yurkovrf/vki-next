'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './Students.module.scss';
import useStudents from '@/hooks/useStudents';
import StudentInterface from '@/types/StudentInterface';

const Students = (): React.ReactElement => {
  const { students } = useStudents();
  const { groups } = useGroups();

  return (
    <div className={styles["students"]}>
      {students.map((student: StudentInterface) => (
        <div key={student.id}>
            <h2>
                {student.last_name}
                {student.first_name}
                {student.middle_name}
            </h2>
            <h3>{groups.find(x => x.id === student.groupId)?.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Students;
