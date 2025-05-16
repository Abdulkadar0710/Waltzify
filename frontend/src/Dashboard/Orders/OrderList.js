import React, { useState } from "react";
import New from "./New";
import ReadyToShip from "./ReadyToShip";
import InTransit from "./InTransit";
import Reconcilliation from "./Reconcilliation";
import CancelOrders from "./CancelOrders";
import Delivered from "./Delivered";
import Prepaid from "./Prepaid";
import All from "./All"; // Assuming you have these components
import { useLocation } from "react-router-dom"; 
const OrderList = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "New");
  
  // Function to render the component based on the active tab
  const renderComponent = () => {
    switch (activeTab) {
      case "New":
        return <New />;
      case "Ready To Ship":
        return <ReadyToShip />;
      case "In Transit":
        return <InTransit />;
      case "Reconcilliation":
        return <Reconcilliation />;
      case "Cancel Orders":
        return <CancelOrders />;
        case "Prepaid":
        return <Prepaid />;
      case "Delivered":
        return <Delivered />;
      case "All":
        return <All />;
      default:
        return <New />;
    }
  };

  return (
    <div className="p-4">
  {/* Tab Navigation */}
  <div className="flex justify-around mb-4 space-x-2">
    {["New", "Ready To Ship", "In Transit", "Reconcilliation", "Cancel Orders","Prepaid","Delivered", "All"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 font-semibold rounded ${activeTab === tab ? "bg-white text-blue-600" : "bg-white text-gray-700"}`}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Active Tab Indicator */}
  <div className="relative mb-2">
    <div className={`absolute h-[0.2rem] mt-[1px] bg-blue-600 transition-all duration-300 ease-in-out`} style={{
      width: `${100 /10}%`,
      left: `${(Array.from(["New", "Ready To Ship", "In Transit", "Reconcilliation", "Cancel Orders",'Prepaid', "Delivered", "All"]).indexOf(activeTab) * (100/ 7.4))}%`
    }} />
    <div className="h-[0.2rem] bg-gray-200"></div>
  </div>

  {/* Render the component based on active tab */}
  <div className="tab-content">{renderComponent()}</div>
</div>

   
    
  );
};

export default OrderList;
