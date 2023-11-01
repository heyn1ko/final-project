import React from 'react';
import { signOut } from '../actions';

export default function LogoutButton() {
  return (
    <form>
      <button className="sign out Button" formAction={signOut}>
        Sign Out{' '}
      </button>
    </form>
  );
}
