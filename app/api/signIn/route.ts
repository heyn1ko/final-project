import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../database/session';
import { getUserWithPasswordHashByEmail } from '../../../database/users';
import { secureCookieOptions } from '../../../util/cookies';

const signInSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

export type SignInResponseBodyPost =
  | {
      user: { email: string };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SignInResponseBodyPost>> {
  // Task: Implement the user registration workflow
  const body = await request.json();
  // console.log('body:', body);
  // 2. Validate the user data

  const result = signInSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }
  // 3. verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashByEmail(
    result.data.email,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'email or password not valid' }] },
      { status: 403 },
    );
  }
  // console.log('Check:', userWithPasswordHash);
  // 4. Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );
  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ message: 'username or password not valid' }] },
      {
        status: 401,
      },
    );
  }
  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 6. Create the session record
  const session = await createSession(userWithPasswordHash.id, token);
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
    user: { email: userWithPasswordHash.email },
  });
}
