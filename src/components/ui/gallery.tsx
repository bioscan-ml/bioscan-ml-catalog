import { StarIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Tag } from "./tag";

export const Gallery = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div>
    <h2 className="heading-sm mb-8">{title}</h2>
    <div className="grid grid-cols-5 gap-8">{children}</div>
  </div>
);

export const GalleryItem = ({
  description = "No description provided.",
  href,
  name,
  starCount,
  tags,
}: {
  description?: string;
  href: string;
  name: string;
  starCount?: number;
  tags: string[];
}) => (
  <a
    className="flex flex-col bg-muted rounded-md border shadow-xs transition-[color,box-shadow] hover:shadow-lg"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    <div className="p-4 bg-[#f3f4f6] border-b">
      <h3 className="text-lg font-medium">{name}</h3>
      {starCount !== undefined ? (
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <StarIcon className="w-4 h-4" />
          <span>{starCount}</span>
        </div>
      ) : null}
    </div>
    <div className="grow flex flex-col gap-4 p-4">
      <div className="grow">
        <p className="text-sm">{description ?? "No description provided."}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Tag>{tag}</Tag>
        ))}
      </div>
    </div>
  </a>
);
