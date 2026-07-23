import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Layout from "./components/Layout";
import BookmarkGrid from "./components/BookmarkGrid";
import BookmarkForm from "./components/BookmarkForm";
import Settings, { type Theme } from "./components/Settings";
import Categories from "./components/Categories";
import type { Bookmark } from "./components/BookmarkCard";
import type { SidebarView } from "./components/Sidebar";

const BOOKMARKS_KEY = "bookmarks-app:bookmarks";
const THEME_KEY = "bookmarks-app:theme";

const SAMPLE_BOOKMARKS: Bookmark[] = [
  { id: "1", title: "React Docs", url: "https://react.dev", category: "Docs", tags: ["dev"], isFavorite: true },
  { id: "2", title: "MDN Web Docs", url: "https://developer.mozilla.org", category: "Docs", tags: ["dev"], isFavorite: false },
  { id: "3", title: "GitHub", url: "https://github.com", category: "Dev Tools", tags: ["dev"], isFavorite: false },
];


function loadBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : SAMPLE_BOOKMARKS;
  } catch {
    return SAMPLE_BOOKMARKS;
  }
}

function loadTheme(): Theme {
  const raw = localStorage.getItem(THEME_KEY);
  return raw === "light" ? "light" : "dark";
}

export default function App() {
  const [activeView, setActiveView] = useState<SidebarView>("dashboard");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [showAddForm, setShowAddForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);


  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);


  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleToggleFavorite = (id: string) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
  };

  const handleEditBookmark = (updatedBookmark: Bookmark) => {
    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
      )
    );
  };

  // wrapper to accept either an updated Bookmark or an id (some components may call onEdit with id)
  const handleEdit = (payload: string | Bookmark) => {
    if (typeof payload === "string") {
      // if only id provided, no updated data to apply — noop or could open edit UI
      return;
    }
    handleEditBookmark(payload);
  };

  const handleAddBookmark = (bookmark: Bookmark) => {
    setBookmarks((prev) => [...prev, bookmark]);
    setShowAddForm(false);
  };

  const handleNavigate = (view: SidebarView) => {
    setCategoryFilter(null);
    setShowAddForm(false);
    setActiveView(view);
  };

  const handleAddClick = () => {
    // if we're on categories/settings, jump to bookmarks so the form is visible
    if (!showGrid) {
      setCategoryFilter(null);
      setActiveView("bookmarks");
    }
    setShowAddForm((v) => !v);
  };

  // Delete function
  const handleDelete = (idToDelete: string | number) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.id !== idToDelete)
    );
  };

  const query = searchQuery.trim().toLowerCase();

const bySearch = bookmarks.filter((b) => {
  if (!query) return true;
  return (
    b.title.toLowerCase().includes(query) ||
    b.url.toLowerCase().includes(query) ||
    b.category.toLowerCase().includes(query) ||
    (b.description?.toLowerCase().includes(query) ?? false) ||
    b.tags.some((tag) => tag.toLowerCase().includes(query))
  );
});

  const visible =
    activeView === "favorites"
      ? bySearch.filter((b) => b.isFavorite)
      : categoryFilter
        ? bySearch.filter((b) => b.category === categoryFilter)
        : bySearch;

  const showGrid = activeView === "dashboard" || activeView === "bookmarks" || activeView === "favorites";

  return (
    <Layout
      activeView={activeView}
      onNavigate={handleNavigate}
      onSearch={setSearchQuery}
      onAddClick={handleAddClick}
    >
      {showGrid && (
        <>
          <div className="view-header">
            <h2 className="view-header-title">
              {categoryFilter ? categoryFilter : activeView === "favorites" ? "Favorites" : "Dashboard"}
            </h2>
            <button className="view-header-add-btn" onClick={() => setShowAddForm((v) => !v)}>
              <Plus size={16} /> Add Bookmark
            </button>
          </div>

          {showAddForm && <BookmarkForm onAdd={handleAddBookmark} />}

          <BookmarkGrid bookmarks={visible} onToggleFavorite={handleToggleFavorite} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}

      {activeView === "categories" && (
        <Categories
          bookmarks={bookmarks}
          onSelectCategory={(cat) => {
            setCategoryFilter(cat);
            setActiveView("bookmarks");
          }}
        />
      )}

      {activeView === "settings" && <Settings theme={theme} onThemeChange={setTheme} />}
    </Layout>
  );
}