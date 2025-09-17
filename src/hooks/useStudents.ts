import { useQuery } from '@tanstack/react-query';
import { getGroupsApi } from '@/api/groupsApi';
import type GroupInterface from '@/types/GroupInterface';
import { getStudentsApi } from '@/api/studentsApi';
import StudentInterface from '@/types/StudentInterface';

interface GroupsHookInterface {
  students: StudentInterface[];
}

const useStudents = (): GroupsHookInterface => {
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: false,
  });

  return {
    students: data ?? [],
  };
};

export default useStudents;
