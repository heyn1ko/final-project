'use server';
import React from 'react';
import { signOut } from '../actions';

// ('use-server');

export default function SignOutButton() {
  return (
    <form>
      <button formAction={signOut}>Sign Out </button>
    </form>
  );
}
