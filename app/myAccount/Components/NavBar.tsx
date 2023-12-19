import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../../../database/users';
import { signOut } from '../actions';

export default async function NavBar() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <div className=" grid grid-cols-3 gap-x-1 pl-10 pr-10  pt-10 divide-y-6">
      <div>
        <Link href="/" className="navHeading">
          HOME
        </Link>
        <Link href="/spaces" className="navHeading">
          SPACES
        </Link>

        <Link href="/map" className="navHeading">
          MAP
        </Link>

        <Link href="/programme" className="navHeading">
          PROGRAMME
        </Link>

        <Link href="/contact" className="navHeading">
          CONTACT
        </Link>
        <Link
          href="/admin"
          className="text-blue-950 font-display font-[900] flex items-center gap-x-2 p-1 text-2xl tracking-wider	hover:text-[#0000EE]	"
        >
          ACCOUNT
        </Link>
        <hr className="w-35 h-1.5 my-10 pl-10 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
      </div>
      <div className="absolute right-10	pb-10 font-display font-[500]  items-center gap-x-2 p-1 text-2xl gap-80 text-cyan-800	hover:text-[#0000EE]">
        {user ? (
          <form action={signOut}>
            <button>Sign Out</button>
          </form>
        ) : (
          <Link href="/myAccount">Sign In/Sign Up</Link>
        )}
      </div>
    </div>
  );
}

// {
//   user ? (
//     <>
//       <Link href="/admin">My Account</Link>
//     </>
//   ) : (
//     <>
//       <Link href="/myAccount">Sign In/Sign Up</Link>
//       <Link href="/login">Login</Link>
//     </>
//   );
// }

// {
//   /* <Link
//           href="/myAccount"
//           className="font-display font-[500]  items-center gap-x-2 p-1 text-4xl gap-80 text-indigo-300	hover:text-[#0000EE]

//           "
//         >
//           My Account
//         </Link> */
// }
