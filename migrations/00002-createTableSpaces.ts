import { Sql } from 'postgres';

export type Spaces = {
  id: number;
  userId: number;
  accessibilityId: string[];
  name: string;
  address: string;
  postcode: string;
  city: string | null;
  country: string | null;
  contact: string;
  socialMedia: string | null;
  website: string;
  introduction: string;
  accessibilityDescription: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      spaces (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        accessibility_id VARCHAR [],
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        postcode VARCHAR(255) NOT NULL,
        city VARCHAR(255),
        country VARCHAR(255),
        contact VARCHAR(255) NOT NULL,
        social_media VARCHAR(255),
        website VARCHAR(255) NOT NULL,
        introduction TEXT NOT NULL,
        accessibility_description TEXT NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE spaces `;
}
