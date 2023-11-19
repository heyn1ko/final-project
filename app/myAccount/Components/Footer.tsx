export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0  bg-white rounded-lg shadow  mt-94 m-8 dark:bg-gray-700">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="pl-0 text-sm text-gray-200 sm:text-center dark:text-gray-700">
          © 2023 <a className="hover:underline">Index™</a>. All Rights
          Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-4 text-sm font-medium text-gray-500 dark:text-gray-200 sm:mt-0">
          <li>
            <a className="hover:underline me-4 md:me-6">About</a>
          </li>
          <li>
            <a className="hover:underline me-4 md:me-6">Privacy Policy</a>
          </li>
          <li>
            <a className="hover:underline me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
