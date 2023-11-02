import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/session';
import SignOutButton from '../myAccount/Components/SignOutButton';

export default async function AdminPage() {
  // Task: Add redirect to home if user is logged in
  // 1. Checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) redirect('myAccount?returnTo=/admin');

  // 4. If the sessionToken cookie is valid, allow access to admin page
  // const animals = await getAnimals();
  return (
    <section className="pl-10 pt-10">
      Admin page!
      <SignOutButton />
    </section>
  );
}
