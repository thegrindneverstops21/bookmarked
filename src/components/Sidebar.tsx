import { LayoutDashboard, Bookmark, Star, FolderKanban, Settings } from "lucide-react";

export type SidebarView = "dashboard" | "bookmarks" | "favorites" | "categories" | "settings";

interface SidebarProps {
  activeView: SidebarView;
  onNavigate: (view: SidebarView) => void;
}

const NAV_ITEMS: { id: SidebarView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
  { id: "favorites", label: "Favorites", icon: Star },
  { id: "categories", label: "Categories", icon: FolderKanban },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">B</div>
        <div className="sidebar-brand-title">Bookmarked</div>
      </div>
      
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