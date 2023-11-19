import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../database/session';
import { createSpace } from '../../../database/space';
import { Spaces } from '../../../migrations/00002-createTableSpaces';

export const spaceSchema = z.object({
  userId: z.number(),
  accessibilityId: z.string().array(),
  name: z.string().min(3),
  address: z.string().min(5),
  postcode: z.string().min(7),
  city: z.string().nullish(),
  country: z.string().nullish(),
  contact: z.string().min(7),
  socialMedia: z.string().nullish(),
  website: z.string(),
  introduction: z.string(),
  accessibilityDescription: z.string(),
});

export type CreateSpaceResponseBodyPost =
  | {
      space: Spaces;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateSpaceResponseBodyPost>> {
  // 1. Get the user data from the request
  const body = await request.json();
  // 2. Validate the user data
  // console.log(body);
  const result = spaceSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Authentication token is invalid' }],
      },
      { status: 401 },
    );
  }

  console.log('api resp', result.data);

  // 3. Create the space
  const newSpace = await createSpace(
    result.data.userId,
    result.data.accessibilityId,
    result.data.name,
    result.data.address,
    result.data.postcode,
    result.data.city,
    result.data.country,
    result.data.contact,
    result.data.socialMedia,
    result.data.website,
    result.data.introduction,
    result.data.accessibilityDescription,
  );

  // 4. If the note creation fails, return an error

  if (!newSpace) {
    return NextResponse.json(
      {
        errors: [{ message: 'Space creation failed' }],
      },
      { status: 500 },
    );
  }

  // 6. Return the text content of the note
  return NextResponse.json({
    space: newSpace,
  });
}
