import Fuse from "fuse.js";
import { DownloadIcon, GitForkIcon, HeartIcon, StarIcon } from "lucide-react";
import { useMemo } from "react";
import { Tag } from "./tag";

const SEARCH_OPTIONS = {
  keys: ["name", "tags"],
  threshold: 0.4,
};

const TAGS_LIMIT = 5;

type GalleryItemProps = {
  description?: string;
  downloadCount?: number;
  forksCount?: number;
  href: string;
  id: string;
  lastUpdated: Date;
  likeCount?: number;
  name: string;
  starCount?: number;
  tags?: string[];
};

export const Gallery = ({
  items,
  orderBy,
  searchString,
  title,
}: {
  items: GalleryItemProps[];
  orderBy?: string;
  searchString?: string;
  title: string;
}) => {
  const filteredItems = useMemo(() => {
    let result = [...items];

    if (searchString?.length) {
      const fuse = new Fuse(items, SEARCH_OPTIONS);
      result = fuse.search(searchString)?.map(({ item }) => item);
    }

    if (orderBy) {
      if (orderBy === "name") {
        result.sort((i1, i2) =>
          i1.name < i2.name ? -1 : i1.name > i2.name ? 1 : 0
        );
      }

      if (orderBy === "lastUpdated") {
        result.sort(
          (i1, i2) => i2.lastUpdated.getTime() - i1.lastUpdated.getTime()
        );
      }

      if (orderBy === "likes") {
        result.sort(
          (i1, i2) =>
            (i2.likeCount ?? i2.starCount ?? 0) -
            (i1.likeCount ?? i1.starCount ?? 0)
        );
      }
    }

    return result;
  }, [items, orderBy, searchString]);

  return (
    <div>
      <h2 className="heading-sm mb-8">
        {title} ({filteredItems.length})
      </h2>
      {filteredItems.length ? (
        <div className="grid grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <GalleryItem key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <p className="text-sm">No items to show.</p>
      )}
    </div>
  );
};

const GalleryItem = ({
  description = "No description provided.",
  downloadCount,
  forksCount,
  href,
  lastUpdated,
  likeCount,
  name,
  starCount,
  tags = [],
}: GalleryItemProps) => (
  <a
    className="flex flex-col bg-muted rounded-md border shadow-xs transition-[color,box-shadow] overflow-hidden hover:shadow-lg"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    <div className="p-4 bg-[#f3f4f6] border-b">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium">{name}</h3>
        <span className="text-muted-foreground text-xs text-right">
          Last updated {lastUpdated.toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center gap-4">
        {starCount !== undefined ? (
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <StarIcon className="w-4 h-4 text-chart-4 fill-chart-4" />
            <span>{starCount}</span>
          </div>
        ) : null}
        {likeCount !== undefined ? (
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <HeartIcon className="w-4 h-4 text-chart-1 fill-chart-1" />
            <span>{likeCount}</span>
          </div>
        ) : null}
        {downloadCount !== undefined ? (
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <DownloadIcon className="w-4 h-4" />
            <span>{downloadCount}</span>
          </div>
        ) : null}
        {forksCount !== undefined ? (
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <GitForkIcon className="w-4 h-4" />
            <span>{forksCount}</span>
          </div>
        ) : null}
      </div>
    </div>
    <div className="grow flex flex-col gap-4 p-4">
      <div className="line-clamp-5">
        <p className="text-sm">{description ?? "No description provided."}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {tags.slice(0, TAGS_LIMIT).map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
        {tags.length > TAGS_LIMIT ? (
          <span className="text-xs text-muted-foreground">
            + {tags.length - TAGS_LIMIT} more
          </span>
        ) : null}
      </div>
    </div>
  </a>
);
