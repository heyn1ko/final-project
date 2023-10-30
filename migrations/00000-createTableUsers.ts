import { Sql } from 'postgres';

export type User = {
  id: number;
  email: string;
  isConfirmed: boolean;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      email varchar(50) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL,
      is_confirmed boolean DEFAULT true
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
