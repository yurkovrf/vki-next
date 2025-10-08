'use client';

import useGroups from '@/hooks/useGroups';
import type GroupInterface from '@/types/GroupInterface';
import styles from './AddStudent.module.scss';
import useStudents from '@/hooks/useStudents';
import StudentInterface from '@/types/StudentInterface';
import { useForm } from 'react-hook-form';

const AddStudent = (): React.ReactElement => {
    const { addStudentMutate } = useStudents();
    const { handleSubmit, control, register, reset, formState: { isSubmitSuccessful, errors }, } = useForm<StudentInterface>();

    const onSubmit = (data: StudentInterface) => {
        addStudentMutate(data);
        reset();
    };
    return (
        <div className={styles["add-student"]}>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles["field"]}>
                    <span>Имя</span>
                    <input {...register("first_name", { required: true })} />
                </div>
                <div className={styles["field"]}>
                    <span>Фамилия</span>
                    <input {...register("last_name", { required: true })} />
                </div>
                <div className={styles["field"]}>
                    <span>Отчество</span>
                    <input {...register("middle_name", { required: true })} />
                </div>
                <div className={styles["field"]}>
                    <span>Номер группы</span>
                    <input {...register("groupId", { required: true, valueAsNumber: true })} />
                </div>
                {isSubmitSuccessful && <p>Пользователь добавлен.</p>}
                {errors?.root?.server && <p>Ошибка при добавлении пользователя.</p>}
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default AddStudent;
