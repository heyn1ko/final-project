'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { SignInResponseBodyPost } from '../../api/signIn/route';

type Props = { returnTo?: string | string[] };

export default function SignInForm(props: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/signIn', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: SignInResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    router.push(getSafeReturnToPath(props.returnTo) || `/admin`);
    // router.push('/admin');

    //  This is not the secured way of doing returnTo
    // if (props.returnTo) {
    //   console.log('Checks Return to: ', props.returnTo);
    //   router.push(props.returnTo);
    // }
    router.refresh();
  }

  return (
    <form
      className="pl-10 font-display tracking-widest text-lg"
      onSubmit={async (event) => await handleRegister(event)}
    >
      DO YOU HAVE AN ACCOUNT? <br />
      PLEASE LOG IN HERE.
      <br />
      <br />
      <label>
        Email
        <input
          className="input"
          type="email"
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
      <button className="signButton">SIGN IN</button>
      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
