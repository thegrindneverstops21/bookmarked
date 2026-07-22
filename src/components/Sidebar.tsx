import { LayoutDashboard, Bookmark, Star, FolderKanban, Settings } from 'lucide-react'

export type SidebarView = "dashboard" | "bookmarks" | "favorites" | "categories" | "settings";

interface SideBarProps {
    activeView: SidebarView;
    onNavigate: (view: SidebarView) => void;
}

const NAV_ITEMS: { id: SidebarView; label: string; icon: typeOf LayoutDashboard }