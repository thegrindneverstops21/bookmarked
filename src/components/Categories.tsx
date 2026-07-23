import type { Bookmark } from "./BookmarkCard";

interface CategoriesProps {
    bookmarks: Bookmark[];
    onSelectCategory: (category:string) => void;
}

export default function Categories({ bookmarks, onSelectCategory }: CategoriesProps ){
    const count = bookmarks.reduce<Record<string, number>>((acc, b) => {
        acc[b.category] = (acc[b.category] || 0) + 1;
        return acc;
    }, {});

    const categories = Object.entries(count);

    if(categories.length === 0){
        return <p className="grid-empty">No categories yet</p>;
    }

    return(
        <div className="categories">
            {categories.map(([name, count]) => (
                <button key={name} onClick={() => onSelectCategory(name)} className="categories-item">
                    <span className="categories-name">{name}</span>
                    <span className="categories-count">{count}</span>
                </button>
            ))}
        </div>
    )
}
