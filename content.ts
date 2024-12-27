console.log('enter content.ts')
chrome.runtime.onMessage.addListener((message, _, sendResponse: (resp: object) => void) => {
  (async () => {
    if (message.type === "SET_DATE_RANGE") {
      const { startDate, endDate } = message;

      try {
        // Update the popup with a status message
        await chrome.runtime.sendMessage({ type: "CONTENT_STATUS", status: `Processing dates: ${startDate} to ${endDate}` });

        // Fetch the auth token asynchronously
        const authResult = await chrome.runtime.sendMessage({ type: "GET_AUTH_TOKEN" });
        console.log("Auth token received:", authResult);

        // Respond to the popup with the result
        sendResponse({ status: "Date range processed", token: authResult });
      } catch (error) {
        console.error("Error during message processing:", error);
        sendResponse({ status: "Error", error: (error as Error).message });
      }
    }
  })();
  console.log('content planning to call sendResponse to SET_DATE_RANGE asynchronously'); 
  return true; // Keep the message channel open for the asynchronous sendResponse
});
console.log('exit content.ts')
