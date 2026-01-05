import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Gallery } from "./components/ui/gallery";
import { Input } from "./components/ui/input";
import { useGitHubItems } from "./lib/useGitHubItems";
import { useHuggingFaceDatasets } from "./lib/useHuggingFaceDatasets";
import { useHuggingFaceModels } from "./lib/useHuggingFaceModels";

function App() {
  const [searchString, setSearchString] = useState("");
  const { gitHubItems } = useGitHubItems();
  const { huggingFaceModels } = useHuggingFaceModels();
  const { huggingFaceDatasets } = useHuggingFaceDatasets();

  return (
    <div className="min-h-svh">
      <div className="max-w-sreen-xl m-auto p-16">
        <div className="flex flex-col items-center">
          <img alt="" className="w-32 h-32 mb-8" src="/bioscan-sites.png"></img>
          <h1 className="heading-base text-primary text-center mb-4">
            BIOSCAN-ML Catalog
          </h1>
          <p className="text-lg text-muted-foregorund text-center mb-16">
            Explore public datasets, models and code. Catalog inspired by{" "}
            <a
              className="underline"
              href="https://imageomics.github.io/catalog/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Imageomics
            </a>
            .
          </p>
          <div className="w-full max-w-lg mb-16">
            <div className="relative">
              <Input
                className="px-10"
                onChange={(e) => setSearchString(e.currentTarget.value)}
                placeholder="Search catalog..."
                value={searchString}
              />
              <div className="absolute top-0 left-0 h-10 w-10 flex items-center justify-center">
                <SearchIcon className="w-4 h-4" />
              </div>
              {searchString.length ? (
                <Button
                  className="absolute top-0 right-0 h-10 w-10"
                  onClick={() => setSearchString("")}
                  size="icon"
                  variant="ghost"
                >
                  <XIcon />
                </Button>
              ) : null}
            </div>
          </div>
          <div className="w-full flex flex-col gap-32">
            <Gallery
              items={huggingFaceDatasets.map((huggingFaceDataset) => ({
                description:
                  huggingFaceDataset.cardData?.description ??
                  huggingFaceDataset.description,
                downloadCount: huggingFaceDataset.downloads,
                href: `https://huggingface.co/datasets/${huggingFaceDataset.id}`,
                id: huggingFaceDataset.id,
                likeCount: huggingFaceDataset.likes,
                name:
                  huggingFaceDataset.cardData?.pretty_name ??
                  huggingFaceDataset.id.replace("bioscan-ml/", ""),
                tags:
                  huggingFaceDataset.cardData?.tags ?? huggingFaceDataset.tags,
                updatedAt: new Date(huggingFaceDataset.lastModified),
              }))}
              searchString={searchString}
              large
              title="Datasets"
            />
            <Gallery
              items={huggingFaceModels.map((huggingFaceModel) => ({
                downloadCount: huggingFaceModel.downloads,
                href: `https://huggingface.co/${huggingFaceModel.id}`,
                id: huggingFaceModel.id,
                likeCount: huggingFaceModel.likes,
                name: huggingFaceModel.id.replace("bioscan-ml/", ""),
                tags: huggingFaceModel.tags,
                updatedAt: new Date(huggingFaceModel.lastModified),
              }))}
              large
              searchString={searchString}
              title="Models"
            />
            <Gallery
              items={gitHubItems.map((gitHubItem) => ({
                description: gitHubItem.description,
                forksCount: gitHubItem.forks_count,
                href: gitHubItem.html_url,
                id: `${gitHubItem.id}`,
                name: gitHubItem.name,
                starCount: gitHubItem.stargazers_count,
                tags: gitHubItem.topics,
                updatedAt: new Date(gitHubItem.updated_at),
              }))}
              large
              searchString={searchString}
              title="Code"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
