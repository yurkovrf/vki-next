'use client';

import useGroups from '@/hooks/useGroups';
import styles from './Student.module.scss';
import StudentInterface from '@/types/StudentInterface';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({student, onDelete}: Props): React.ReactElement => {
    const { groups } = useGroups();

    const onDeleteHandler = (): void => {
        onDelete(student.id);
    };

    return (
        <div key={student.id} className={`${styles.Student} ${student.isDeleted ? styles['--isDeleted'] : '' }`}>
            <div className={styles["student-info"]}>
                <span>
                    {student.id} - {student.last_name} {student.first_name} {student.middle_name}
                </span>
                <span>{groups.find(x => x.id === student.groupId)?.name}</span>
            </div>
            <button onClick={onDeleteHandler}>Удалить</button>
        </div>
    );
};

export default Student;
