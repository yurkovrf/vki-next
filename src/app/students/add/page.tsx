import Groups from '@/components/Groups/Groups';
import Page from '@/components/layout/Page/Page';
import AddStudent from '@/components/Students/AddStudent/AddStudent';
import Students from '@/components/Students/Students';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Студенты - Вэб разработка ВКИ - Next.js шаблон',
  description: 'Шаблон для веб-разработки с использованием Next.js, React Hook Form, Yup, SCSS, Eslint, TanStack Query (React Query)',
};

const StudentsPage = (): React.ReactNode => (
  <Page>
    <h1>Добавление студента</h1>
    <AddStudent />
  </Page>
);

export default StudentsPage;
