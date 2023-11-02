import Link from 'next/link';

// 'use client';
// import { DropDownMenu } from './DropDownMenu';

export default function NavBar() {
  return (
    <div
      className="grid grid-cols-3 gap-x-1 pl-10 pr-10 pb-10 pt-10

    "
    >
      <div>
        {/* <DropDownMenu /> */}

        <Link
          href="/"
          className="font-display font-[900] flex items-center gap-x-2 p-1 text-4xl tracking-widest	hover:text-[#0000EE]	"
        >
          HOME
        </Link>
        <Link
          href="/spaces"
          className="font-display font-[900] flex items-center gap-x-2 p-1 text-4xl	tracking-wider	hover:text-[#0000EE]	"
        >
          SPACES
        </Link>

        <Link
          href="/map"
          className="font-display font-[900] flex items-center gap-x-2 p-1 text-4xl tracking-wider	hover:text-[#0000EE]	"
        >
          MAP
        </Link>

        <Link
          href="/programme"
          className="font-display font-[900] flex items-center gap-x-2 p-1 text-4xl tracking-wider	hover:text-[#0000EE]	"
        >
          PROGRAMME
        </Link>

        <Link
          href="/contact"
          className="font-display font-[900] flex items-center gap-x-2 p-1 text-4xl tracking-wider	hover:text-[#0000EE]	"
        >
          CONTACT
        </Link>
      </div>
      <div className="fixed top-0  right-10 pb-10 pt-10">
        <Link
          href="/myAccount"
          className="font-display font-[500]  items-center gap-x-2 p-1 text-4xl gap-80 text-gray-400	hover:text-black

          "
        >
          My Account
        </Link>
      </div>
    </div>
  );
}
