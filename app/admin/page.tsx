import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/session';
import { getUserBySessionToken } from '../../database/users';
import AdminSpaceForm from './adminSpace/AdminSpaceForm';

export default async function AdminPage() {
  // Task: Add redirect to home if user is logged in
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  const user =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));
  if (!user) redirect('/myAccount');

  // 3. If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) redirect('myAccount?returnTo=/admin');

  // 4. If the sessionToken cookie is valid, allow access to admin page

  return (
    <div className="pl-10 pt-10">
      {' '}
      <AdminSpaceForm userId={user.id} />
    </div>
  );
}
