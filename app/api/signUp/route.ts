import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByEmail } from '../../../database/users';
import { User } from '../../../migrations/00000-createTableUsers';

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
  const body = await request.json();
  // console.log('body:', body);
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
  // console.log('result:', result);
  // 3.Check if user already exist in the database
  const user = await getUserByEmail(result.data.email);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'email is already taken' }] },
      { status: 403 },
    );
  }

  // console.log('Result:', user);
  // 4.Hash the plain password
  const passwordHash = await bcrypt.hash(result.data.password, 12);
  // console.log('Result:', passwordHash, result.data.password);
  // 5. Save the user information with the hashed password in the database
  const newUser = await createUser(result.data.email, passwordHash);
  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }
  // console.log('Result:', newUser);
  return NextResponse.json({
    user: {
      email: 'fottopoulos@gmail.com',
    },
  });
}
