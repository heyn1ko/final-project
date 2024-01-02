import SignInForm from './Components/SignInForm';
import SignUpForm from './Components/SignUpForm';

export const metadata = {
  title: 'My Account | Index',
  description: 'Independent Art Spaces',
};
export default function MyAccount() {
  return (
    <div className="p-10 md:grid-cols-3md:gap-1 md:pl-10 md:pr-0 flex flex-col md:flex-row items-center justify-center">
      <SignInForm />
      <hr className="h-[200px] md:w-2 bg-gray-700 rounded-lg my-4 md:my-0 md:mx-16" />
      <SignUpForm />
    </div>
  );
}
