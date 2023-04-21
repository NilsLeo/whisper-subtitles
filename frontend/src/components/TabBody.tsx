import React from 'react'
type Props = {
  name: string;
  description: string;
  children: React.ReactNode;
};
const TabBody = ({name, description, children}: Props) => {
  return (
    <div className="w-full"
      id={`card-type-tab-${name}`}
      role="tabpanel"
      aria-labelledby={`card-type-tab-item-${name}`}
    >
{description}

{children}
    </div>
  );
}

export default TabBody