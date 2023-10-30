'use client';
import { useState } from 'react';
import { SignUpResponseBodyPost } from '../../api/signUp/route';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/signUp', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data: SignUpResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
  }

  return (
    <div>
      <form onSubmit={async (event) => await handleRegister(event)}>
        <label>
          email
          <input onChange={(event) => setEmail(event.currentTarget.value)} />
        </label>
        <label>
          password
          <input onChange={(event) => setPassword(event.currentTarget.value)} />
        </label>
        <button>Sign Up</button>
        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </div>
  );
}
