import { cache } from 'react';
import { Spaces } from '../migrations/00002-createTableSpaces';
import { sql } from './connect';

// type Spaces = {
//   id: number;
//   // user_id: number;
//   // email: string;
//   name: string;
//   address: string;
//   contact: string;
//   social_media: string;
//   website: string;
//   introduction: string;
//   accessibility_description: string;
// };

export const createSpace = cache(
  async (
    userId: number,
    accessibilityId: string,
    name: string,
    address: string,
    postcode: string,
    city: string,
    country: string,
    contact: string,
    socialMedia: string,
    website: string,
    introduction: string,
    accessibilityDescription: string,
  ) => {
    const [space] = await sql<Spaces[]>`
      INSERT INTO
        spaces (
          user_id,
          accessibility_id,
          name,
          address,
          postcode,
          city,
          country,
          contact,
          social_media,
          website,
          introduction,
          accessibility_description
        )
      VALUES
        (
          ${userId},
          ${accessibilityId},
          ${name},
          ${address},
          ${postcode},
          ${city || null},
          ${country || null},
          ${contact},
          ${socialMedia || null},
          ${website},
          ${introduction},
          ${accessibilityDescription}
        ) RETURNING *
    `;

    return space;
  },
);

export const getSpaces = cache(async () => {
  const spaces = await sql<Spaces[]>`
    SELECT
      spaces.*,
      users.email
    FROM
      spaces
      INNER JOIN users ON spaces.user_id = users.id
  `;
  return spaces;
});
