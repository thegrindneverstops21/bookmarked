import { useState } from "react";
import type { Bookmark } from "./BookmarkCard";

interface BookmarkFormProps {
  onAdd: (bookmark: Bookmark) => void;
}

export default function BookmarkForm({ onAdd }: BookmarkFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onAdd({
      id: crypto.randomUUID(),
      title: title.trim(),
      url: url.trim(),
      category: category.trim() || "Uncategorized",
      description: description.trim() || undefined,
      tags,
      isFavorite: false,
    });

    setTitle("");
    setUrl("");
    setCategory("");
    setDescription("");
    setTagsInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3 className="add-form-heading">Add Bookmark</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="add-form-input"
        required
      />
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="add-form-input"
        required
      />
      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="add-form-input"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="add-form-input add-form-textarea"
        rows={2}
      />
      <input
        type="text"
        placeholder="Tags, comma separated (optional)"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        className="add-form-input"
      />

      <button type="submit" className="add-form-submit">
        Save Bookmark
      </button>
    </form>
  );
}