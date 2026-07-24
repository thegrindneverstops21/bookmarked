import type { ReactNode } from "react";
import type { SidebarView } from "./Sidebar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProp {
    activeView: SidebarView;
    onNavigate: (view: SidebarView) => void;
    children: ReactNode;
}

export default function Layout({
    activeView,
    onNavigate,
    children,
}: LayoutProp) {
    return(
        <div className="layout">
            <div className="layout-body">
                <Sidebar activeView={activeView} onNavigate={onNavigate} />
                <main className="layout-content">{children}</main>
            </div>
            <Footer />
        </div>
    );
}