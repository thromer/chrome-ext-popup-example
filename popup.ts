document.getElementById("send-range")!.addEventListener("click", async () => {
  const startDate = (document.getElementById("start-date") as HTMLInputElement).value;
  const endDate = (document.getElementById("end-date") as HTMLInputElement).value;

  if (!startDate || !endDate) {
    updateStatus("Please provide both start and end dates.");
    return;
  }

  const message = { type: "SET_DATE_RANGE", startDate, endDate };
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.id) {
    const response = await chrome.tabs.sendMessage(tab.id, message);
    updateStatus(response?.status || "No response from content script.");
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "CONTENT_STATUS") {
    updateStatus(message.status);
  }
  // TODO true?
  return true;
});

function updateStatus(status: string) {
  const statusDiv = document.getElementById("status")!;
  statusDiv.textContent = status;
}
