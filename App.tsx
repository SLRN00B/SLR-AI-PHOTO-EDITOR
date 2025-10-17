
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EditorWorkspace } from './components/EditorWorkspace';
import { ImageResult } from './components/ImageResult';
import { Spinner } from './components/Spinner';
import { ErrorToast } from './components/ErrorToast';
import { editImageWithGemini } from './services/geminiService';
import { fileToGenerativePart } from './utils/imageUtils';
// fix: 'GenerativePart' is not an exported member of '@google/genai'. Replaced with 'Part'.
import type { Part } from '@google/genai';

export default function App() {
  const [originalImage, setOriginalImage] = useState<{ url: string; part: Part } | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      setError(null);
      setEditedImage(null);
      const imagePart = await fileToGenerativePart(file);
      setOriginalImage({
        url: URL.createObjectURL(file),
        part: imagePart,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image.');
      setOriginalImage(null);
    }
  }, []);

  const handleEdit = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please provide an image and a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const newImageBase64 = await editImageWithGemini(originalImage.part, prompt);
      setEditedImage(`data:image/jpeg;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during image generation.';
      setError(errorMessage.includes('API key not valid') ? 'API key is not valid. Please check your key.' : errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const handleStartOver = useCallback(() => {
    if (originalImage) {
      URL.revokeObjectURL(originalImage.url);
    }
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  }, [originalImage]);

  const editorView = useMemo(() => {
    if (!originalImage) {
      return <ImageUploader onImageUpload={handleImageUpload} />;
    }
    return (
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <EditorWorkspace
          originalImageUrl={originalImage.url}
          prompt={prompt}
          setPrompt={setPrompt}
          onEdit={handleEdit}
          onStartOver={handleStartOver}
          isLoading={isLoading}
        />
        <ImageResult editedImageUrl={editedImage} isLoading={isLoading} />
      </div>
    );
  }, [originalImage, prompt, editedImage, isLoading, handleImageUpload, handleEdit, handleStartOver]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 relative">
      <Header />
      <main className="w-full max-w-7xl mx-auto flex-grow flex flex-col items-center justify-center mt-8">
        {editorView}
      </main>
      <footer className="w-full text-center p-4 mt-8 text-gray-500">
        <p>Powered by Gemini</p>
      </footer>
      {isLoading && <Spinner />}
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
    </div>
  );
}
