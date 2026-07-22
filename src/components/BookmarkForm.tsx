import { useState } from "react";
import type { Bookmark } from "./BookmarkCard";

interface BookmarkFormProps {
    onAdd: (bookmark: Bookmark) => void
}

export default function BookmarkForm({ onAdd }: BookmarkFormProps) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !url.trim()) return;

        onAdd({
            id: crypto.randomUUID(),
            title: title.trim(),
            url: url.trim(),
            category: category.trim() || "Uncategorized",
            isFavorite: false
        });

        setTitle("");
        setUrl("");
        setCategory("");
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h3 className="form-heading">Add Bookmark</h3>

            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
            <input type="url" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} className="form-input" required />
            <input type="text" placeholder="Category(Optional)" value={category} onChange={(e) => setCategory(e.target.value)} className="form-input" />

            <button type="submit" className="form-button">Save Bookmark</button>
        </form>
    );
}