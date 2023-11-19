import SignInForm from './Components/SignInForm';
import SignUpForm from './Components/SignUpForm';

export default function MyAccount() {
  return (
    <div className="pt-10 pb-10 pl-10 pr-10 md:pl-0 md:pr-0 flex flex-col md:flex-row items-center justify-center">
      <SignInForm />
      <div className="h-[200px] md:w-2 bg-gray-300 my-4 md:my-0 md:mx-16" />
      <SignUpForm />
    </div>
  );
}
