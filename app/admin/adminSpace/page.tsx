import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../../database/users';
import AdminSpaceForm from './AdminSpaceForm';

export default async function space() {
  const sessionTokenCookie = cookies().get('sessionToken');
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  if (!user) redirect('/login');

  return (
    <main className="pl-10 pt-5">
      <div>
        <AdminSpaceForm userId={user.id} />
      </div>
    </main>
  );
}
