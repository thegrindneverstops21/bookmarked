import { useState, useEffect } from "react";
import { BookmarkPlus, Search } from "lucide-react";
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
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
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

  // handles both add and edit: if the bookmark's id already exists, update it in place;
  // otherwise append it as new. BookmarkForm always calls this same function.
  const handleSaveBookmark = (bookmark: Bookmark) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === bookmark.id);
      return exists
        ? prev.map((b) => (b.id === bookmark.id ? bookmark : b))
        : [...prev, bookmark];
    });
    setShowAddForm(false);
    setEditingBookmark(null);
  };

  // clicking Edit on a card opens the form pre-filled with that bookmark
  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
    setShowAddForm(true);
  };

  const handleOpenAddForm = () => {
    setEditingBookmark(null); // make sure we're not accidentally still in edit mode
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingBookmark(null);
  };

  const handleNavigate = (view: SidebarView) => {
    setCategoryFilter(null);
    setShowAddForm(false);
    setEditingBookmark(null);
    setActiveView(view);
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

  // empty state copy + whether to show the "add" CTA, per tab —
  // this is what keeps every tab's empty state consistent but still contextually correct
  const emptyMessage = categoryFilter
    ? `No bookmarks in "${categoryFilter}" yet.`
    : activeView === "favorites"
      ? "No favorites yet. Star a bookmark to see it here."
      : "No bookmarks yet. Add your first one!";

  const showEmptyStateButton = activeView !== "favorites";

  return (
    <Layout
      activeView={activeView}
      onNavigate={handleNavigate}

    >
      {showGrid && (
        <>
          <div className="view-header">
            <h2 className="view-header-title">
              {categoryFilter ? categoryFilter : activeView === "favorites" ? "Favorites" : "Dashboard"}
            </h2>
            <div className="header-search">
              <Search className='search-icon' size={16} />
              <input type='text' placeholder='search by title, tag, url, or description' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='search-input' />
            </div>
            <button className="header-btn" onClick={handleOpenAddForm}>
              <BookmarkPlus size={16}  />
              Add Bookmark
            </button>
          </div>

          {showAddForm && (
            <BookmarkForm
              onSave={handleSaveBookmark}
              onCancel={handleCancelForm}
              editingBookmark={editingBookmark}
            />
          )}

          <BookmarkGrid
            bookmarks={visible}
            onToggleFavorite={handleToggleFavorite}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddClick={handleOpenAddForm}
            emptyMessage={emptyMessage}
            showAddButton={showEmptyStateButton}
          />
        </>
      )}

      {activeView === "categories" && (
        <Categories
          bookmarks={bookmarks}
          onSelectCategory={(cat) => {
            setCategoryFilter(cat);
            setActiveView("bookmarks");
          }}
          onAddClick={() => {
            setActiveView("bookmarks");
            handleOpenAddForm();
          }}
        />
      )}

      {activeView === "settings" && <Settings theme={theme} onThemeChange={setTheme} />}
    </Layout>
  );
}