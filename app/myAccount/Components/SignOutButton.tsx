import React from 'react';
import { signOut } from '../actions';

export default function LogoutButton() {
  return (
    <form>
      <button
        className=" font-display tracking-widest font-[500] text-[#0000EE] hover:text-white border border-[#0000EE] hover:bg-[#0000EE] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-xl w-52 h-12 px-5 py-2.5 text-center mr-2 mb-2 dark:border-[#0000EE] dark:text-[#0000EE] dark:hover:text-white dark:hover:bg-[#0000EE] dark:focus:ring-[#0000EE]"
        formAction={signOut}
      >
        Sign Out{' '}
      </button>
    </form>
  );
}
