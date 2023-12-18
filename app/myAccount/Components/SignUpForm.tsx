'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { SignUpResponseBodyPost } from '../../api/signUp/route';

type Props = { returnTo?: string | string[] };

export default function SignUpForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

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
    router.push(getSafeReturnToPath(props.returnTo) || `/admin`);

    router.refresh();
  }

  return (
    <form
      className="font-display tracking-widest text-lg"
      onSubmit={async (event) => await handleRegister(event)}
    >
      OH, YOU DON'T ? <br />
      THEN, PLEASE SIGN UP HERE.
      <br />
      <br />
      <label>
        Email
        <input
          className="input"
          type="Email"
          placeholder="Email"
          required
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label>
        Password
        <input
          className="input"
          type="Password"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <br />
      <button className="signButton">SIGN UP</button>
      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
