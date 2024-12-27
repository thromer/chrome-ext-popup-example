console.log('Enter popup');
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
  } else {
    console.log(`Couldn't tab to send the range`);
  }
});

chrome.runtime.onMessage.addListener((message) => {
  console.log(`Received message of type ${message.type}`);
  if (message.type === "CONTENT_STATUS") {
    updateStatus(message.status);
  }
  // TODO true?
  console.log('handled status message synchronously I think');
  return true;
});

function updateStatus(status: string) {
  console.log(`setting status to ${status}`);
  const statusDiv = document.getElementById("status")!;
  statusDiv.textContent = status;
}
console.log('exit popup');
