import { useEffect, useState } from "react";

type HuggingFaceModel = {
  downloads: number;
  id: string;
  lastModified: string;
  likes: number;
  tags: string[];
};

const URL = "https://huggingface.co/api/models?author=bioscan-ml&full=true";

export const useHuggingFaceModels = () => {
  const [huggingFaceModels, setHuggingFaceModels] = useState<
    HuggingFaceModel[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(URL);
        const data: HuggingFaceModel[] = await response.json();
        setHuggingFaceModels(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getItems();
  }, []);

  return { huggingFaceModels, isLoading, error };
};
