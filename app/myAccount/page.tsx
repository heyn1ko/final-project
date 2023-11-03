import SignInForm from './Components/SignInForm';
import SignUpForm from './Components/SignUpForm';

export default function MyAccount() {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 gap-x-3 pl-10 pr-60 pt-10">
      <div className="border-r-4 border-gray-300 ">
        <SignInForm />
      </div>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}
