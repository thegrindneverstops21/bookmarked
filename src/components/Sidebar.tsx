import { LayoutDashboard, Bookmark, Star, FolderKanban, Settings } from "lucide-react";

export type SidebarView =  "bookmarks" | "favorites" | "categories" | "settings";

interface SidebarProps {
  activeView: SidebarView;
  onNavigate: (view: SidebarView) => void;
}

{/* Array that stores data for each sidebar item */}
const NAV_ITEMS: { id: SidebarView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "categories", label: "Categories", icon: FolderKanban },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
     /* Logo and brand name */
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">B</div>
        <div className="sidebar-brand-title">Bookmarked</div>
      </div>
     { /* Render navigation bar */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`sidebar-item ${activeView === id ? "sidebar-item-active" : ""}`}
          >
            <Icon size={18} className="sidebar-icon" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}