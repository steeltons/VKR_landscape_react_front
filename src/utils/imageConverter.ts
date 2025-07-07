export const base64ToFile = (base64String: string, filename: string, mimeType = 'image/png'): File => {
  const byteString = atob(base64String);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], filename, { type: mimeType });
};
