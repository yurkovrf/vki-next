import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addStudentApi, deleteStudentApi, getStudentsApi } from '@/api/studentsApi';
import type StudentInterface from '@/types/StudentInterface';

interface StudentsHookInterface {
  students: StudentInterface[];
  deleteStudentMutate: (studentId: number) => void;
  addStudentMutate: (student: StudentInterface) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: false,
  });

  /**
   * Мутация удаления студента
   */
  const deleteStudentMutate = useMutation({
    // вызов API delete
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    // оптимистичная мутация (обновляем данные на клиенте до API запроса delete)
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      // получаем данные из TanStackQuery
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);
      let updatedStudents = [...(previousStudents ?? [])] ;

      if (!updatedStudents) return;

      // помечаем удаляемую запись
      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true } : {}),
      }));
      // обновляем данные в TanStackQuery
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('>>> deleteStudentMutate  err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    // обновляем данные в случаи успешного выполнения mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onSuccess: async (deletedStudent, variables, context) => {
      console.log('>>> deleteStudentMutate onSuccess', deletedStudent, variables, context);
      // удаляем студента
      const updatedStudents = context.updatedStudents.filter((student: StudentInterface) => student.id !== Number(deletedStudent?.deletedStudentId));
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
    },
    // onSettled: (data, error, variables, context) => {
    //   // вызывается после выполнения запроса в случаи удачи или ошибке
    //   console.log('>> deleteStudentMutate onSettled', data, error, variables, context);
    // },
  });

   const addStudentMutate = useMutation({
    mutationFn: async (newStudent: StudentInterface) => {
      return addStudentApi(newStudent); // возвращает студента с id
    },
    onMutate: async (newStudent) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);

      const tempId = -Math.floor(Math.random() * 10000)
      const optimisticStudent: StudentInterface = {
        ...newStudent,
        id: tempId,
        isDeleted: false,
      };

      queryClient.setQueryData<StudentInterface[]>(['students'], (old) => [
        ...(old ?? []),
        optimisticStudent,
      ]);

      return { previousStudents, tempId };
    },
    onError: (err, variables, context) => {
      console.error('>>> addStudentMutate error', err);
      queryClient.setQueryData(['students'], context?.previousStudents);
    },
    onSuccess: (addedStudent, context) => {
      console.log('>>> addStudentMutate onSuccess', addedStudent);
      // Обновляем список: заменяем временный студент на реальный (с правильным id)
      queryClient.setQueryData<StudentInterface[]>(['students'], (old = []) =>
        old.map(student =>
          student.id === context?.tempId ? {...student, id: addedStudent?.} : student
        )
      );
    },
  });

  return {
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
    addStudentMutate: addStudentMutate.mutate
  };
};

export default useStudents;
