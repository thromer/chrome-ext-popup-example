chrome.runtime.onMessage.addListener((message, _, sendResponse: (resp: object) => void) => {
  if (message.type === "GET_AUTH_TOKEN") {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      sendResponse(token);
    });
    return true; // Indicates async response
  }
});
