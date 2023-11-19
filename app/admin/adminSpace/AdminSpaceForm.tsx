'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const accessibilityOptions = [
  { id: '1', value: 'mobility', label: 'Mobility' },
  { id: '2', value: 'visual', label: 'Visual' },
  { id: '3', value: 'hearing', label: 'Hearing' },
  { id: '4', value: 'cognitive', label: 'Cognitive' },
  { id: '5', value: 'parking', label: 'Parking Space' },
];
export default function CreateSpaceForm({ userId }: { userId: number }) {
  const [formData, setFormData] = useState({
    userId: userId,
    accessibilityId: [] as string[],
    name: '',
    address: '',
    postcode: '',
    contact: '',
    socialMedia: '',
    website: '',
    introduction: '',
    accessibilityDescription: '',
  });

  const router = useRouter();

  const handleCheckboxChange = (id: string) => {
    const isChecked = formData.accessibilityId.includes(id);
    const updatedIds = isChecked
      ? formData.accessibilityId.filter((selectedId) => selectedId !== id)
      : [...formData.accessibilityId, id];

    setFormData({ ...formData, accessibilityId: updatedIds });
  };

  const handleCreateSpace = async () => {
    try {
      await fetch('/api/space', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      router.refresh();
    } catch (error) {
      console.error('Error creating space:', error);
    }
  };
  // const handleAccessibilityChange = (selectedOptions) => {
  //   const selectedValues = selectedOptions.map((option) => option.value);
  //   setFormData({ ...formData, accessibilities: selectedValues });
  // };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateSpace();
      }}
    >
      <h1 className="font-display text-zinc-800 font-[900]  text-2xl tracking-wider  ">
        YOUR GALLERY SPACE DETAILS
      </h1>

      {/* First Section: Accessibility Section */}
      <div className="mr-6 pt-4 font-display">
        <h2 className="subHeaderForm">ACCESSIBILITY</h2>
        <div className="mr-6 font-display font-[500] text-lg ">
          <br />

          <div className="flex flex-wrap pt-3">
            {accessibilityOptions.map((option) => (
              <div key={`accessibility-${option.id}`} className="mb-2 mr-4">
                <input
                  type="checkbox"
                  id={option.id}
                  checked={formData.accessibilityId.includes(option.id)}
                  onChange={() => handleCheckboxChange(option.id)}
                  className="h-6 w-6 mr-2"
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
        <br />
        <h2 className=" subHeaderForm">DETAILS</h2>
        {/* Second Column: Form Inputs */}
        <div className="flex flex-wrap font-display pt-0 pb-16 pt-5">
          <div className="font-display font-[500] text-lg " />

          <br />
          <div className="mr-6">
            <label className="mb-2">
              Name
              <input
                className="input mb-2"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.currentTarget.value })
                }
              />
            </label>

            <label className="mb-2">
              Address
              <input
                className="input mb-2"
                value={formData.address}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    address: event.currentTarget.value,
                  })
                }
              />
            </label>
            <label className="mb-2">
              Postcode
              <input
                className="input mb-2"
                value={formData.postcode}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    postcode: event.currentTarget.value,
                  })
                }
              />
            </label>
            <label className="mb-2">
              Contact
              <input
                className="input mb-2"
                value={formData.contact}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    contact: event.currentTarget.value,
                  })
                }
              />
            </label>
            <label className="mb-2">
              Social Media
              <input
                className="input mb-2"
                value={formData.socialMedia}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    socialMedia: event.currentTarget.value,
                  })
                }
              />
            </label>
            <label className="mb-2">
              Website
              <input
                className="input mb-2"
                value={formData.website}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    website: event.currentTarget.value,
                  })
                }
              />
            </label>
          </div>
          {/* Third Column: Introduction and Accessibility Description */}
          <div className="mr-6">
            <label className="mb-2">
              Introduction
              <textarea
                className="inputTall"
                value={formData.introduction}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    introduction: event.currentTarget.value,
                  })
                }
              />
            </label>
            <label className="mb-2">
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
