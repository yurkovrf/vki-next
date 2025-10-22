import type GroupInterface from '@/types/GroupInterface';
import StudentInterface from '@/types/StudentInterface';

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = await response.json() as StudentInterface[];
    return students;
  }
  catch (err) {
    console.log('>>> getStudentsApi', err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<{deletedStudentId: number} | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/${studentId}`, 
      { "method": "DELETE" }
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }

    const deletedStudent = await response.json();

    return deletedStudent;
  }
  catch (err) {
    console.log('>>> deleteStudentApi', err);
    return null;
  }
};

export const addStudentApi = async (student: StudentInterface): Promise<{id: number} | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students/add`, 
      { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }

     return response.json() as Promise<StudentInterface>;
  } catch (err) {
    console.log('>>> addStudentApi', err);
    return null;
  }
}