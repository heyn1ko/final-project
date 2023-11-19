import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../database/session';
import { createUser, getUserByEmail } from '../../../database/users';
import { User } from '../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../util/cookies';

const signUpSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

export type SignUpResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SignUpResponseBodyPost>> {
  // Task: Implement the user registration workflow
  // 1. Get the user data from the request

  const body = await request.json();
  // 2. Validate the user data

  const result = signUpSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }
  // 3.Check if user already exist in the database
  const user = await getUserByEmail(result.data.email);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'email is already taken' }] },
      { status: 403 },
    );
  }

  // 4. Hash the plain password
  const passwordHash = await bcrypt.hash(result.data.password, 12);
  // 5. Save the user information with the hashed password in the database
  const newUser = await createUser(result.data.email, passwordHash);
  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 6. Create the session record
  const session = await createSession(newUser.id, token);
  console.log('session:', session);
  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new session' }] },
      {
        status: 401,
      },
    );
  }
  // 7.Send the new cookie to Headers

  // cookies().set({
  //   name: 'sessionToken',
  //   value: session.token,
  //   httpOnly: true,
  //   path: '/',
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 60 * 60 * 24, // Expires in 24H
  //   sameSite: 'lax', // this prevents CSRF attacks
  // });
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });
  // console.log('Result:', newUser);
  return NextResponse.json({
    user: newUser,
  });
}
