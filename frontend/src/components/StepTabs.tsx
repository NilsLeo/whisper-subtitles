import React from "react";
import Tab from "./Tab";
import TabBody from "./TabBody";

export default function StepTabs() {
  const tabs = document.querySelectorAll("[data-hs-tab]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Hide all tab panels
      const tabPanels = document.querySelectorAll('[role="tabpanel"]');
      tabPanels.forEach((panel) => {
        panel.classList.add("hidden");
      });

      // Show the clicked tab panel
      const targetId = e.currentTarget.getAttribute("data-hs-tab");
      const targetPanel = document.querySelector(targetId);
      targetPanel.classList.remove("hidden");
    });
  });

  const tabss: any = [
    {
      name: "tab1",
      content: "tab1",
    },
  ];
  return (
    <div className="w-full">
      <div className="border-b border-gray-200 w-full">
        <nav
          className="flex items-center justify-between w-full"
          aria-label="Tabs"
          role="tablist"
        >
          <Tab name="Transcribe"></Tab>
          <Tab name="Summarize"></Tab>
        </nav>
      </div>

      <div className="mt-3">
        <TabBody description="Paste a Link to get started" name="Transcribe">
          <div className="flex w-full">
            <div>
              <label
                htmlFor="youtube-link"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                id="youtube-link"
                type="text"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="e.g. https://youtu.be/dQw4w9WgXcQ"
                required
              ></input>
            </div>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Transcribe!
            </button>
          </div>
        </TabBody>
        <TabBody name="Summarize"></TabBody>
      </div>
    </div>
  );
}
