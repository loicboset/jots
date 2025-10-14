const urlBase64ToUnit8Array = (base64String: string): Uint8Array => {
  // Replace URL-safe characters with standard base64 characters
  let base64 = base64String.replace(/-/g, "+").replace(/_/g, "/");

  // Add padding if necessary to make the string length a multiple of 4
  while (base64.length % 4) {
    base64 += "=";
  }

  try {
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  } catch (e) {
    console.error("Failed to convert VAPID key to Uint8Array:", e);
    throw e; // This will help identify if there's still an issue with the base64 string
  }
};

export default urlBase64ToUnit8Array;
