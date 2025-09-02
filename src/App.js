import React, { useState } from "react";
import FormValidation from "./components/FormValidation";
import Submissions from "./components/Submissions";
import "./App.css";

function App() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("form");

  // Function to render the content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "form":
        return <FormValidation setActiveTab={setActiveTab} />;
      case "submissions":
        return <Submissions />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <h1>Form Validation</h1>

      {/* Tabs navigation */}
      <div className="tabs">
        <button
          className={activeTab === "form" ? "active" : ""}
          onClick={() => setActiveTab("form")}
        >
          Form Validation
        </button>
        <button
          className={activeTab === "submissions" ? "active" : ""}
          onClick={() => setActiveTab("submissions")}
        >
          Submissions
        </button>
      </div>

      {/* Render the active tab content */}
      <section>{renderContent()}</section>
    </div>
  );
}

export default App;
