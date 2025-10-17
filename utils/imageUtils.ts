
// fix: 'GenerativePart' is not an exported member of '@google/genai'. Replaced with 'Part'.
import type { Part } from '@google/genai';

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      // remove the data url prefix
      resolve(base64data.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64data = await blobToBase64(file);
  return {
    inlineData: {
      data: base64data,
      mimeType: file.type,
    },
  };
};
