import React, { useState } from "react";

const openSvg = (
  <svg
    data-accordion-icon=""
    class="w-3 h-3 shrink-0"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5 5 1 1 5"
    ></path>
  </svg>
);
const closeSvg = (
  <svg
    data-accordion-icon
    className="w-3 h-3 rotate-180 shrink-0"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5 5 1 1 5"
    />
  </svg>
);
export const Accordion = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2>
        <button
          type="button"
          onClick={ () => setOpen(!open) }
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 me-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>{" "}
            { faq.question }
          </span>
          { open ? openSvg : closeSvg }
        </button>
      </h2>
      <div
        id="accordion-open-body-1"
        className={!open ? 'hidden' : ''}
        aria-labelledby="accordion-open-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-slate-900">
          <p className="mb-2 text-gray-500 dark:text-slate-200">
            { faq.answer }
          </p>
        </div>
      </div>
    </div>
  );
};
