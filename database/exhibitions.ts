import { cache } from 'react';
import { sql } from './connect';

export type Exhibitions = {
  id: number;
  userId: number;
  accessibilityId: string;
  isExhibition: boolean;
  title: string;
  startDate: string;
  endDate: string;
  link: string;
  artists: string;
  description: string;
  accessibilityDescription: string;
};

export const createExhibition = cache(
  async (
    userId: number,
    accessibilityId: string,
    isExhibition: boolean,
    title: string,
    startDate: string,
    endDate: string,
    link: string,
    artists: string,
    description: string,
    accessibilityDescription: string,
  ) => {
    const [exhibition] = await sql<Exhibitions[]>`
      INSERT INTO
        exhibitions (
          user_id,
          accessibility_id,
          is_exhibition,
          title,
          start_date,
          end_date,
          link,
          artists,
          description,
          accessibility_description
        )
      VALUES
        (
          ${userId},
          ${accessibilityId},
          ${isExhibition},
          ${title || null},
          ${startDate || null},
          ${endDate || null},
          ${link || null},
          ${artists || null},
          ${description || null},
          ${accessibilityDescription || null}
        ) RETURNING *
    `;

    return exhibition;
  },
);

export const getExhibitions = cache(async () => {
  const exhibitions = await sql<Exhibitions[]>`
    SELECT
      exhibitions.*,
      users.email
    FROM
      exhibitions
      INNER JOIN users ON exhibitions.user_id = users.id
  `;
  return exhibitions;
});
