import React from 'react'

type Props = {
  name: string;
};
const Tab = ({name}: Props) => {
  return (
    <button
      type="button"
      className="w-full text-blue-600 py-3 px-4 inline-flex items-center text-center text-sm font-medium border rounded-t-lg"
      id={`card-type-tab-item-${name}`}
      data-hs-tab={`#card-type-tab-${name}`}
      aria-controls={`card-type-tab-${name}`}
      role="tab"
    >
      {name}
    </button>
  );
}

export default Tab