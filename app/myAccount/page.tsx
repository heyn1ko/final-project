import SignInForm from './Components/SignInForm';
import SignOutButton from './Components/SignOutButton';
import SignUpForm from './Components/SignUpForm';

export default function MyAccount() {
  return (
    <div>
      <SignInForm />

      <SignUpForm />

      <SignOutButton />
    </div>
  );
}
