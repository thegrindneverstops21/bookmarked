import type { Bookmark } from "./BookmarkCard";
import { BookmarkPlus } from "lucide-react";
import ImageIllustration from "../assets/empty-state.png";

interface CategoriesProps {
    bookmarks: Bookmark[];
    onSelectCategory: (category: string) => void;
    onAddClick?: () => void;
}

export default function Categories({ bookmarks, onSelectCategory, onAddClick }: CategoriesProps) {
    const count = bookmarks.reduce<Record<string, number>>((acc, b) => {
        acc[b.category] = (acc[b.category] || 0) + 1;
        return acc;
    }, {});

    const categories = Object.entries(count);

    return (
        <div className="categories-container">
            <h2 className="category-heading">Categories</h2>

            {categories.length === 0 ? (
                <div className="empty-grid-state">
                    <img src={ImageIllustration} alt="No categories yet" className="grid-state" />
                    <button className="empty-state-btn" onClick={onAddClick}>
                        <BookmarkPlus size={16} /> Add your first bookmark
                    </button>
                    <p className="empty-state">No categories yet. Add a bookmark to create one.</p>
                </div>
            ) : (
                <div className="categories">
                    {categories.map(([name, count]) => (
                        <button key={name} onClick={() => onSelectCategory(name)} className="categories-item">
                            <span className="categories-name">{name}</span>
                            <span className="categories-count">{count}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}