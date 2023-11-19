import { Sql } from 'postgres';

export type Exhibitions = {
  id: number;
  userId: number;
  accessibilityId: number;
  isExhibition: boolean;
  title: string;
  startDate: string;
  endDate: string;
  link: string;
  artists: string;
  description: string;
  accessibilityDescription: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      exhibitions (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        accessibility_id INTEGER NOT NULL,
        is_exhibition BOOLEAN NOT NULL,
        title VARCHAR(50) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        link VARCHAR(255) NOT NULL,
        artists VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        accessibility_description TEXT NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE exhibitions `;
}
