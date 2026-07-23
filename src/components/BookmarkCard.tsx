import { Star, ExternalLink } from "lucide-react";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  tags: string[];
  favicon?: string;
  isFavorite: boolean;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  onToggleFavorite: (id: string) => void;
}

export default function BookmarkCard({ bookmark, onToggleFavorite }: BookmarkCardProps) {
  const { id, title, url, category, description, tags, favicon, isFavorite } = bookmark;

  return (
    <div className="card">
      <div className="card__header">
        {favicon ? (
          <img src={favicon} alt="" className="card__favicon" />
        ) : (
          <div className="card__favicon card__favicon--fallback" />
        )}
        <button
          onClick={() => onToggleFavorite(id)}
          className={`card__fav-btn ${isFavorite ? "card__fav-btn--active" : ""}`}
        >
          <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="card__title">{title}</h3>
      <span className="card__category">{category}</span>

      {description && <p className="card__description">{description}</p>}

      {tags.length > 0 && (
        <div className="card__tags">
          {tags.map((tag) => (
            <span key={tag} className="card__tag">{tag}</span>
          ))}
        </div>
      )}

      <a href={url} target="_blank" rel="noreferrer" className="card__link">
        Visit <ExternalLink size={12} />
      </a>
    </div>
  );
}