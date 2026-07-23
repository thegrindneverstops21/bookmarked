import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Layout from "./components/Layout";
import BookmarkGrid from "./components/BookmarkGrid";
import AddBookmarkForm from "./components/AddBookmarkForm";
import SettingsView, { Theme } from "./components/SettingsView";
import CategoriesView from "./components/CategoriesView";
import { Bookmark } from "./components/BookmarkCard";
import { SidebarView } from "./components/Sidebar";

const BOOKMARKS_KEY = "bookmarks-app:bookmarks";
const THEME_KEY = "bookmarks-app:theme";

const SAMPLE_BOOKMARKS: Bookmark[] = [
  { id: "1", title: "React Docs", url: "https://react.dev", category: "Docs", isFavorite: true },
  { id: "2", title: "MDN Web Docs", url: "https://developer.mozilla.org", category: "Docs", isFavorite: false },
  { id: "3", title: "GitHub", url: "https://github.com", category: "Dev Tools", isFavorite: false },
];

// Read once, synchronously, before first render — avoids a flash of empty state
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

  // sync theme -> DOM attribute + localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // sync bookmarks -> localStorage, every time they change
  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleToggleFavorite = (id: string) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
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

  const bySearch = bookmarks.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visible =
    activeView === "favorites"
      ? bySearch.filter((b) => b.isFavorite)
      : categoryFilter
      ? bySearch.filter((b) => b.category === categoryFilter)
      : bySearch;

  const showGrid = activeView === "dashboard" || activeView === "bookmarks" || activeView === "favorites";

  return (
    <Layout
      userName="Sam"
      activeView={activeView}
      onNavigate={handleNavigate}
      onSearch={setSearchQuery}
    >
      {showGrid && (
        <>
          <div className="view-header">
            <h2 className="view-header__title">
              {categoryFilter ? categoryFilter : activeView === "favorites" ? "Favorites" : "Dashboard"}
            </h2>
            <button className="view-header__add-btn" onClick={() => setShowAddForm((v) => !v)}>
              <Plus size={16} /> Add Bookmark
            </button>
          </div>

          {showAddForm && <AddBookmarkForm onAdd={handleAddBookmark} />}

          <BookmarkGrid bookmarks={visible} onToggleFavorite={handleToggleFavorite} />
        </>
      )}

      {activeView === "categories" && (
        <CategoriesView
          bookmarks={bookmarks}
          onSelectCategory={(cat) => {
            setCategoryFilter(cat);
            setActiveView("bookmarks");
          }}
        />
      )}

      {activeView === "settings" && <SettingsView theme={theme} onThemeChange={setTheme} />}
    </Layout>
  );
}