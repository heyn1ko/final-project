import Link from 'next/link';

export default function AdminSideBar() {
  return (
    <div className="flex flex-col items-start p-4 pl-10">
      <nav>
        <ul>
          <li>
            <Link href="/admin">
              <div className="text-cyan-800 font-display font-[900] flex items-center gap-x-2 p-1 text-3xl tracking-widest hover:text-[#0000EE]">
                Space
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/adminProgramme">
              <div className="text-cyan-800 font-display font-[900] flex items-center gap-x-2 p-1 text-3xl tracking-widest hover:text-[#0000EE]">
                Programme
              </div>
            </Link>
          </li>
        </ul>
        <hr className="w-48 h-2 my-4 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
      </nav>
    </div>
  );
}
