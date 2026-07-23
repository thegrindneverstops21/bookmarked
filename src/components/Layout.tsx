import type { ReactNode } from "react";
import Navbar from "./Navbar";
import type { SidebarView } from "./Sidebar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProp {
    activeView: SidebarView;
    onNavigate: (view: SidebarView) => void;
    onSearch?: (query: string) => void;
    onAddClick?: () => void;
    children: ReactNode;
}

export default function Layout({
    activeView,
    onNavigate,
    onSearch,
    onAddClick,
    children,
}: LayoutProp) {
    return(
        <div className="layout">
            <Navbar onSearch={onSearch} onAddClick={onAddClick}/>

            <div className="layout-body">
                <Sidebar activeView={activeView} onNavigate={onNavigate} />
                <main className="layout-content">{children}</main>
            </div>
            <Footer />
        </div>
    );
}