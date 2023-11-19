'use server';

import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../database/session';

export async function signOut() {
  // Get the session token from the cookie
  const cookieStore = cookies();

  const token = cookieStore.get('sessionToken');
  //  Delete the session from the DATABASE based on the token
  if (token) await deleteSessionByToken(token.value);
  // console.log('Token:', token);

  // Delete the session cookie from the BROWSER, maxAge -1 is a JS time that is no longer now
  cookieStore.set('sessionToken', '', {
    maxAge: -1,
  });
}
