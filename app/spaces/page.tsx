export const metadata = {
  title: 'List of the Art Spaces',
  description: 'Independent Art Spaces',
};
export default function Spaces() {
  return (
    <main className="pl-10 pb-16 pr-10 ">
      <h1 className="font-display  text-cyan-800 font-[900] text-3xl tracking-wider ">
        GALLERY SPACES INDEX{' '}
      </h1>

      {/* Type Section */}
      <div className="mr-6 pt-6 font-display ">
        <div className="mr-6 font-display text-lg pt-2 pl-5 pb-2 border-stone-200 border-8 rounded-xl w-[85vw]">
          <h2 className="subHeaderPublic">TYPE</h2>
          <label>
            Exhibition
            <input type="radio" className="h-6 w-6 mr-2 ml-3" />
            <label>
              Event{}
              <input type="radio" className="h-6 w-6 mr-2 ml-3" />
            </label>
          </label>
          <hr className="w-full h-2 my-10 left-0 bg-gray-100 border-0 md:my-10 dark:bg-stone-200 rounded-lg" />
          {/* Second Section: Accessibility Section */}
          <div className=" pl-3 pb-3  ">
            <h2 className="subHeaderPublic">ACCESSIBILITY</h2>
            <label>
              Mobility{' '}
              <input type="checkbox" className="h-6 w-6 mr-2 ml-3 pt-6" />
            </label>
            <label>
              Visual <input type="checkbox" className="h-6 w-6 mr-2 ml-3" />
            </label>
            <label>
              Hearing <input type="checkbox" className="h-6 w-6 mr-2 ml-3" />
            </label>
            <label>
              Cognitive <input type="checkbox" className="h-6 w-6 mr-2 ml-3" />
            </label>
            <label>
              Parking Space{' '}
              <input type="checkbox" className="h-6 w-6 mr-2 ml-3" />
            </label>
          </div>
        </div>
        <div className=" overflow-x-auto rounded-lg">
          <table className="table-auto mt-8 border-stone-200 border-8 rounded-lg w-[85vw]">
            <thead>
              <tr className="rounded-lg">
                <th className="px-8 py-3">Spaces</th>
                <th className="px-8 py-3">District</th>
                <th className="px-8 py-3">Address</th>
                <th className="px-8 py-3">Website</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-16 py-4">20 20</td>
                <td className="border px-16 py-4">1</td>
                <td className="border px-16 py-4">
                  Dr.-Karl-Lueger-Platz 4b/1V
                </td>
                <td className="border px-16 py-4">
                  <a
                    href="https://www.instagram.com/20_20_showcase/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.instagram.com/20_20_showcase/
                  </a>
                </td>
              </tr>
              <tr>
                <td className="border px-16 py-4">Aa collections</td>
                <td className="border px-16 py-4">15</td>
                <td className="border px-16 py-4">Reindorfgasse 9/2/R01</td>
                <td className="border px-16 py-4">
                  <a
                    href="http://www.aacollections.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://www.aacollections.net/
                  </a>
                </td>
              </tr>
              <tr>
                <td className="border px-16 py-4">Ada</td>
                <td className="border px-16 py-4">16</td>
                <td className="border px-16 py-4">Wattgasse 16/6</td>
                <td className="border px-16 py-4">
                  <a
                    href="http://www.aacollections.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://www.aacollections.net/
                  </a>
                </td>
              </tr>
              <tr>
                <td className="border px-16 py-4">bar-du-bois</td>
                <td className="border px-16 py-4">5</td>
                <td className="border px-16 py-4">Diehlgasse 50</td>
                <td className="border px-16 py-4">
                  <a
                    href="http://www.aacollections.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://www.aacollections.net/
                  </a>
                </td>
              </tr>
              {/* Repeat the structure for other entries */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
