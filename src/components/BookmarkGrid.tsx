import BookmarkCard, { type Bookmark } from "./BookmarkCard";
import { BookmarkPlus } from "lucide-react";
import ImageIllustration from "../assets/empty-state.png";
interface BookmarkGridProps {
  bookmarks: Bookmark[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onAddClick?: () => void;
}

export default function BookmarkGrid({ bookmarks, onToggleFavorite, onDelete, onEdit, onAddClick }: BookmarkGridProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="empty-grid-state">
        <img src={ImageIllustration} alt="No bookmarks yet. Add your first one!" className="grid-state" />
        <button className="empty-state-btn" onClick={onAddClick}>
          <BookmarkPlus size={16} /> Add your first bookmark
        </button>
        <h3 className="empty-state">No bookmarks yet. Add your first one!</h3>
      </div>
    );
  }

  return (
    <div className="bookmark-grid">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}