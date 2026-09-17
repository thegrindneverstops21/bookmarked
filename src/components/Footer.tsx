import { Copyright } from "lucide-react";

export default function Footer() {
    //Footer  to show current year instead of hardcoding the current year
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <span className="footer-text"> <Copyright size={14} className="footer-copyright"/> {year} Bookmarked!! Built with React + Typescript</span>
            <div className="footer-links">
                <a href="#" className="footer-link">Privacy</a>
                <a href="#" className="footer-link">Terms</a>
                <a href="#" className="footer-link">About</a>
            </div>
        </footer>
    );
}