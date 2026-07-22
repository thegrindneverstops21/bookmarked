import type { ReactNode } from "react";
import Navbar from "./Navbar";
import type { SidebarView } from "./Sidebar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProp {
    username: string;
    activeView: SidebarView;
    onNavigate: (view: SidebarView) => void;
    onSearch?: (query: string) => void;
    children: ReactNode;
}

export default function Layout({
    username,
    activeView,
    onNavigate,
    onSearch,
    children,
}: LayoutProp) {
    return(
        <div className="layout">
            <Navbar username={username} onSearch={onSearch} />

            <div className="layout-body">
                <Sidebar activeView={activeView} onNavigate={onNavigate} />
                <main className="layout-content">{children}</main>
            </div>
            <Footer />
        </div>
    );
}