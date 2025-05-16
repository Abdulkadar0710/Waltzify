import React from 'react';


const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['New', 'Ready To Ship', 'In Transit', 'Delivered', 'Cancel Orders', 'Reconciliation', 'All'];

  return (
    <div className="flex border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-purple-500 text-purple-600' : 'text-gray-600'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
