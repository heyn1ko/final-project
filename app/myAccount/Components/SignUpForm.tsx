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
          className="border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block  w-96  p-2.5 bg-zinc-400	dark:placeholder-gray-200 dark:text-white  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="Email"
          placeholder="Email"
          required
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <label>
        Password
        <input
          className="border-gray-300 text-gray-900 rounded-md focus:ring-blue-500 focus:border-blue-500 block  w-96  p-2.5 bg-zinc-400	dark:placeholder-gray-200 dark:text-white  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="Password"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <br />
      <button className=" font-display tracking-widest font-[500] text-[#0000EE] hover:text-white border border-[#0000EE] hover:bg-[#0000EE] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-xl w-52 h-12 px-5 py-2.5 text-center mr-2 mb-2 dark:border-[#0000EE] dark:text-[#0000EE] dark:hover:text-white dark:hover:bg-[#0000EE] dark:focus:ring-[#0000EE]">
        SIGN UP
      </button>
      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
