import { useEffect, useState } from "react";

type HuggingFaceModel = {
  cardData?: {
    description?: string;
  };
  downloads: number;
  id: string;
  lastModified: string;
  likes: number;
  tags: string[];
};

const URL = "https://huggingface.co/api/models?author=bioscan-ml&full=true";
const DETAILS_URL = (modelId: string) =>
  `https://huggingface.co/api/models/${modelId}`;

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
        const listResponse = await fetch(URL);
        const listData: { id: string }[] = await listResponse.json();

        // Fetch details for each model
        const models = await Promise.all(
          listData.map(async (model) => {
            const detailResponse = await fetch(DETAILS_URL(model.id));
            const detailsData: HuggingFaceModel = await detailResponse.json();

            return detailsData;
          })
        );

        setHuggingFaceModels(models.filter((model) => !!model));
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
