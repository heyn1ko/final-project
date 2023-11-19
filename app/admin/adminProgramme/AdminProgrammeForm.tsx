'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminProgrammeForm({ userId }: { userId: number }) {
  const [formData, setFormData] = useState({
    isExhibition: true,
    title: '',
    startDate: '',
    endDate: '',
    link: '',
    artists: '',
    description: '',
    accessibilityDescription: '',
  });

  const router = useRouter();

  async function handleCreateProgramme() {
    try {
      await fetch('/api/programme', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          formData,
        }),
      });
      router.refresh();
      setFormData({
        isExhibition: true,
        title: '',
        startDate: '',
        endDate: '',
        link: '',
        artists: '',
        description: '',
        accessibilityDescription: '',
      });
    } catch (error) {
      console.error('Error creating programme:', error);
    }
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateProgramme();
      }}
    >
      <h1 className="font-display  text-zinc-800 font-[900] text-2xl tracking-wider ">
        YOUR GALLERY SPACE PROGRAMME
      </h1>

      {/* Type Section */}
      <div
        className="mr-6 pt-4 font-display"
        role="group"
        aria-label="Type of Programme"
      >
        <div className="mr-6 font-display text-lg">
          <h2 className="subHeaderForm">TYPE</h2>
          <div className="flex flex-wrap  pt-6">
            <label>
              Exhibition
              <input
                type="radio"
                checked={formData.isExhibition}
                onChange={() =>
                  setFormData({ ...formData, isExhibition: true })
                }
                className="h-6 w-6 mr-2 ml-3"
              />
              <label>
                Event{}
                <input
                  type="radio"
                  checked={!formData.isExhibition}
                  onChange={() =>
                    setFormData({ ...formData, isExhibition: false })
                  }
                  className="h-6 w-6 mr-2 ml-3"
                />
              </label>
            </label>
          </div>
          <div>
            {/* Second Section: Accessibility Section */}
            <br />
            <fieldset
              className="mr-6 pt-4 font-display"
              aria-labelledby="accessibility-legend"
              role="group"
            >
              <legend className="subHeaderForm" role="group">
                ACCESSIBILITY
              </legend>
              <div className="pt-6">
                <label>
                  Mobility{' '}
                  <input type="checkbox" className="h-6 w-6 mr-2 ml-3 pt-6" />
                </label>
                <label>
                  Visual <input type="checkbox" className="h-6 w-6 mr-2 ml-3" />
                </label>
                <label>
                  Hearing{' '}
                  <input type="checkbox" className="h-6 w-6 mr-2 ml-3" />
                </label>
                <label>
                  Cognitive{' '}
                  <input type="checkbox" className="h-6 w-6 mr-2 ml-3" />
                </label>
                <label>
                  Parking Space{' '}
                  <input type="checkbox" className="h-6 w-6 mr-2 ml-3" />
                </label>
              </div>
            </fieldset>
          </div>
        </div>
        <br />

        {/* Details Section */}
        <h2 className="subHeaderForm">DETAILS</h2>
        <div className="flex flex-wrap font-display pt-6 pb-16">
          {/* Second Column: Form Inputs */}
          <div className="font-semibold text-lg " />

          <div className="mr-6 ">
            <label className="mb-2 block">
              Title:
              <input
                className="input mb-2"
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.currentTarget.value })
                }
              />
            </label>
            <label className="mb-2 block">
              Start Date
              <input
                className="input mb-2"
                value={formData.startDate}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    startDate: event.currentTarget.value,
                  })
                }
              />
            </label>
            <label className="mb-2 block">
              End Date
              <input
                className="input mb-2"
                value={formData.endDate}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    endDate: event.currentTarget.value,
                  })
                }
              />
            </label>
            <label className="mb-2 block">
              Link{' '}
              <input
                className="input mb-2"
                value={formData.link}
                onChange={(event) =>
                  setFormData({ ...formData, link: event.currentTarget.value })
                }
              />
            </label>
            <label className="mb-2 block">
              Artists{' '}
              <input
                className="input mb-2"
                value={formData.artists}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    artists: event.currentTarget.value,
                  })
                }
              />
            </label>
          </div>

          {/* Third Column: Description and Accessibility Description */}
          <div className="mr-6">
            <label className="mb-2 block">
              Description
              <textarea
                className="inputTall"
                value={formData.description}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    description: event.currentTarget.value,
                  })
                }
              />
            </label>
            <label className="mb-2 block">
              Accessibility Description
              <textarea
                className="inputTall"
                value={formData.accessibilityDescription}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    accessibilityDescription: event.currentTarget.value,
                  })
                }
              />
            </label>
            <div className="flex flex-col items-end">
              <hr className="w-80 h-2 my-10 pl-10 bg-gray-100 border-0 md:my-10 dark:bg-gray-700" />
              <button className="signButton">Create</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
