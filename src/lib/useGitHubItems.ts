import { useEffect, useState } from "react";

type GitHubItem = {
  description: string;
  html_url: string;
  id: number;
  language: string;
  name: string;
  stargazers_count: number;
  topics: string[];
};

export const useGitHubItems = () => {
  const [gitHubItems, setGitHubItems] = useState<GitHubItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(
          "https://api.github.com/orgs/bioscan-ml/repos?type=public"
        );
        const data: GitHubItem[] = await response.json();
        setGitHubItems(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getItems();
  }, []);

  return { gitHubItems, isLoading, error };
};
