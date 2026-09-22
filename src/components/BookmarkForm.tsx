import { useState } from "react";
import type { Bookmark } from "./BookmarkCard";

/* User action */
interface BookmarkFormProps {
  onSave: (bookmark: Bookmark) => void;
  onCancel: () => void;
  editingBookmark?: Bookmark | null;
}

// Component structure and empty state
export default function BookmarkForm({
  onSave,
  onCancel,
  editingBookmark,
}: BookmarkFormProps) {
  
  // Initialize state directly from props.
  // When a unique key is passed by the parent, React resets this state automatically.
  const [title, setTitle] = useState(editingBookmark?.title ?? "");
  const [url, setUrl] = useState(editingBookmark?.url ?? "");
  const [category, setCategory] = useState(editingBookmark?.category ?? "");
  const [description, setDescription] = useState(
    editingBookmark?.description ?? "",
  );
  const [tagsInput, setTagsInput] = useState(
    editingBookmark?.tags.join(", ") ?? "",
  );

  // Run when form is submitted
  // Ensures title & and url are filled
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    // Splits and trims tag if validation is true
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Preserves the bookmark id if it is being edited
    // Generates new id if bookmark is new
    onSave({
      id: editingBookmark ? editingBookmark.id : crypto.randomUUID(),
      title: title.trim(),
      url: url.trim(),
      category: category.trim() || "Uncategorized",
      description: description.trim() || undefined,
      tags,
      isFavorite: editingBookmark ? editingBookmark.isFavorite : false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      {/* Render form heading depending whether user is adding or editing a bookmark */}
      <h3 className="add-form-heading">
        {editingBookmark ? "Edit Bookmark" : "Add Bookmark"}
      </h3>

      <label className="add-form-label">Title</label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="add-form-input"
        required
      />

      <label className="add-form-label">URL</label>
      <input
        type="url"
        placeholder="https://github.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="add-form-input"
        required
      />

      <label className="add-form-label">Category</label>
      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="add-form-input"
      />

      <label className="add-form-label">Description</label>
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="add-form-input add-form-textarea"
        rows={2}
      />

      <label className="add-form-label">Tags</label>
      <input
        type="text"
        placeholder="Tags, comma separated (optional)"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        className="add-form-input"
      />

      {/* Form button change dynamically depending on whether user is editing or creating a new bookmark */}
      <div className="add-form-actions">
        <button type="submit" className="add-form-submit">
          {editingBookmark ? "Save Changes" : "Save Bookmark"}
        </button>
        <button type="button" className="add-form-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
