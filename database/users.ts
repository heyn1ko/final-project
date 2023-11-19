import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00000-createTableUsers';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const createUser = cache(async (email: string, passwordHash: string) => {
  const [user] = await sql<User[]>`
    INSERT INTO
      users (
        email,
        password_hash
      )
    VALUES
      (
        ${email.toLowerCase()},
        ${passwordHash}
      ) RETURNING id,
      email
  `;

  return user;
});

export const getUserByEmail = cache(async (email: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      email
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByEmail = cache(async (email: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});

export const getUserById = cache(async (id: number) => {
  // Postgres always returns an array
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.email
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return user;
});
