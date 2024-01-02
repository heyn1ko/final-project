import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../database/users';
import AdminProgrammeForm from './AdminProgrammeForm';

export const metadata = {
  title: 'My Account',
  description: 'Independent Art Spaces',
};
export default async function programme() {
  const sessionTokenCookie = cookies().get('sessionToken');
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/myAccount');
  return (
    <main className="pl-10 pt-5">
      <div>
        <AdminProgrammeForm userId={user.id} />
      </div>
    </main>
  );
}
