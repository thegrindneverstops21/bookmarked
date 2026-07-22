import { Star, ExternalLink } from "lucide-react";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  favicon?: string;
  isFavorite: boolean;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  onToggleFavorite: (id: string) => void;
}

export default function BookmarkCard({ bookmark, onToggleFavorite }: BookmarkCardProps) {
  const { id, title, url, category, favicon, isFavorite } = bookmark;

  return (
    <div className="card">
      <div className="card-header">
        {favicon ? (
          <img src={favicon} alt="" className="card-favicon" />
        ) : (
          <div className="card-favicon-fallback" />
        )}
        <button
          onClick={() => onToggleFavorite(id)}
          className={`card-fav-btn ${isFavorite ? "card-fav-btn-active" : ""}`}
        >
          <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="card__title">{title}</h3>
      <span className="card__category">{category}</span>

      <a href={url} target="_blank" rel="noreferrer" className="card__link">
        Visit <ExternalLink size={12} />
      </a>
    </div>
  );
}