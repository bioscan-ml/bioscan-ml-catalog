import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Gallery, GalleryItem } from "./components/ui/gallery";
import { Input } from "./components/ui/input";
import { useGitHubItems } from "./lib/useGitHubItems";

function App() {
  const [searchString, setSearchString] = useState("");
  const { gitHubItems } = useGitHubItems();

  return (
    <div className="min-h-svh">
      <div className="max-w-sreen-xl m-auto p-16">
        <div className="flex flex-col items-center">
          <img alt="" className="w-32 h-32 mb-8" src="/bioscan-sites.png"></img>
          <h1 className="heading-base text-primary text-center mb-4">
            BIOSCAN-ML Catalog
          </h1>
          <p className="text-lg text-muted-foregorund text-center mb-16">
            Explore public code, datasets and models. Catalog inspired by{" "}
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
                  size="icon"
                  variant="ghost"
                >
                  <XIcon />
                </Button>
              ) : null}
            </div>
          </div>
          <Gallery title={`GitHub repos (${gitHubItems.length})`}>
            {gitHubItems.map((gitHubItem) => (
              <GalleryItem
                key={gitHubItem.id}
                description={gitHubItem.description}
                href={gitHubItem.html_url}
                name={gitHubItem.name}
                starCount={gitHubItem.stargazers_count}
                tags={[gitHubItem.language, ...gitHubItem.topics]}
              />
            ))}
          </Gallery>
        </div>
      </div>
    </div>
  );
}

export default App;
