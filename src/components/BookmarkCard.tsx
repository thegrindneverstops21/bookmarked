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
/*Check user action */
interface BookmarkCardProps {
  bookmark: Bookmark;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function BookmarkCard({ bookmark, onToggleFavorite, onDelete, onEdit }: BookmarkCardProps) {
  const { id, title, url, category, description, tags, favicon, isFavorite } = bookmark;

  return (
    <div className="card">
      <div className="card-header">
        {favicon ? (
          <img src={favicon} alt="" className="card-favicon" />
        ) : (
          <div className="card-favicon card-favicon-fallback" />
        )}
        <button
          onClick={() => onToggleFavorite(id)}
          className={`card-fav-btn ${isFavorite ? "card-fav-btn-active" : ""}`}
        >
          <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <h3 className="card-title">{title}</h3>
      <span className="card-category">{category}</span>

      {description && <p className="card-description">{description}</p>}

      {tags.length > 0 && (
        <div className="card-tags">
          {tags.map((tag) => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>
      )}

      <a href={url} target="_blank" rel="noreferrer" className="card-link">
        Visit <ExternalLink size={12} />
      </a>
       <button onClick={() => onEdit(id)} className="edit-btn" aria-label={`Edit ${title}`}>
        Edit
      </button>
      <button onClick={() => onDelete(id)} className="delete-btn" aria-label={`Delete ${title}`}>
        Delete
      </button>
    </div>
  );
}