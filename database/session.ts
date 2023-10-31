import { cache } from 'react';
import { sql } from '../database/connect';
import { Session } from '../migrations/00001-createTableSessions';

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

  return session;
});
