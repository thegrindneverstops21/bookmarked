import BookmarkCard, { type Bookmark } from "./BookmarkCard";

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BookmarkGrid({ bookmarks, onToggleFavorite, onDelete }: BookmarkGridProps) {
  if (bookmarks.length === 0) {
    return <p className="grid-empty">No bookmarks yet. Add your first one!</p>;
  }

  return (
    <div className="bookmark-grid">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}