import { cache } from 'react';
import { sql } from '../database/connect';
import { Session } from '../migrations/00001-createTableSessions';

// here we delete cookies that were created for the sessions after their time is expired - in this case 24H
export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM sessions
    WHERE
      expiry_timestamp < now ()
  `;
});

export const createSession = cache(async (userId: number, token: string) => {
  const [session] = await sql<Session[]>`
    INSERT INTO
      sessions (
        user_id,
        token
      )
    VALUES
      (
        ${userId},
        ${token}
      ) RETURNING id,
      token,
      user_id
  `;
  await deleteExpiredSessions();
  return session;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${token} RETURNING id,
      token
  `;

  return session;
});
