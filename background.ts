console.log('enter background.ts');
chrome.runtime.onMessage.addListener((message, _, sendResponse: (resp: object) => void) => {
  console.log(`request for ${message.type}`);
  if (message.type === "GET_AUTH_TOKEN") {
    console.log('calling getAuthToken');
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      console.log('called getAuthToken');
      sendResponse(token);
      console.log(`responded with ${token}`);
    });
    console.log('planning to return auth token via sendResponse asynchronously');
    return true; // Indicates async response
  }
});
console.log('exit background.ts');
