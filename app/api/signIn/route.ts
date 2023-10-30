import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../database/session';
import { getUserWithPasswordHashByEmail } from '../../../database/users';

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
  // Task: Implement the user login workflow

  // 1. Get the user data from the request
  const body = await request.json();

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

  // 4. Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );
  console.log('Check Valid :', userWithPasswordHash);

  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ message: 'email or password not valid' }] },
      {
        status: 401,
      },
    );
  }
  //  Coming in subsequent lecture
  // 4. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // console.log('Token', token);
  // 5. Create the session record
  const session = await createSession(userWithPasswordHash.id, token);
  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new session' }] },
      { status: 401 },
    );
  }
  // 6. Send the new cookie in the headers

  // 6. Return the new user information without the password hash
  return NextResponse.json({
    user: {
      email: userWithPasswordHash.email,
    },
  });
}
