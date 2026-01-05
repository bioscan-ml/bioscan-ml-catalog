import { useEffect, useState } from "react";

type HuggingFaceDataset = {
  cardData?: {
    description: string;
    pretty_name: string;
    tags: string[];
  };
  description: string;
  downloads: number;
  id: string;
  lastModified: string;
  likes: number;
  tags: string[];
};

const URL = "https://huggingface.co/api/datasets?author=bioscan-ml&full=true";

export const useHuggingFaceDatasets = () => {
  const [huggingFaceDatasets, setHuggingFaceDatasets] = useState<
    HuggingFaceDataset[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(URL);
        const data: HuggingFaceDataset[] = await response.json();
        setHuggingFaceDatasets(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getItems();
  }, []);

  return { huggingFaceDatasets, isLoading, error };
};
