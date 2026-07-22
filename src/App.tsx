import { useState } from "react";
import type { Bookmark } from "./components/BookmarkCard"
import { type SidebarView } from "./components/Sidebar"
import Layout from "./components/Layout";
import BookmarkGrid from "./components/BookmarkGrid";

const SAMPLE_BOOKMARKS: Bookmark[] = [
  { id: "1", title: "Trading View", url: "https://www.tradingview.com", category: "Finance", isFavorite: true },
  { id: "2", title: "Github", url: "https://github.com", category: "Developer Tools", isFavorite: false },
  { id: "3", title: "YouTube", url: "https://www.youtube.com/", category: "Entertainment", isFavorite: false },
];

export default function App() {
  const [activeView, setActiveView] = useState<SidebarView>("dashboard");
  const [bookmarks, setBookmark] = useState<Bookmark[]>(SAMPLE_BOOKMARKS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFav = (id: string) => {
    setBookmark((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
  };

const filtered = bookmarks.filter((b) =>
  b.title.toLowerCase().includes(searchQuery.toLowerCase())
);

const visible = activeView === "favorites" ? filtered.filter((b) => b.isFavorite) : filtered;
return (
  <Layout username="Sam" activeView={activeView} onNavigate={setActiveView} onSearch={setSearchQuery}>
    <BookmarkGrid bookmarks={visible} onToggleFavorite={handleFav} />
  </Layout>
);
}

