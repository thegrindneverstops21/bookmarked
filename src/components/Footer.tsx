import { Copyright } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <span className="footer-text"> <Copyright className="copyright"/> {year} Bookmarked!! Built with React + Typescript</span>
            <div className="footer-links">
                <a href="#" className="footer-link">Privacy</a>
                <a href="#" className="footer-link">Terms</a>
                <a href="#" className="footer-link">About</a>
            </div>
        </footer>
    );
}