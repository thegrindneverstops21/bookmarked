import { Search, BookmarkPlus } from 'lucide-react'

interface NavbarProps {
    onSearch?: (query: string) => void;
    onAddClick?: () => void;
}

export default function Navbar({onSearch, onAddClick }: NavbarProps) {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <div className='navbar-logo'>B</div>
                <div className='navbar-title'>Bookmarked</div>
            </div>

            {/* Search */}
            <div className='navbar-search'>
                <Search className='navbar-search-icon' size={16} />
                <input type='text' placeholder='search by title, tag, url, or description' onChange={(e) => onSearch?.(e.target.value)} className='navbar-search-input' />
            </div>

            {/* Add link button */}

            <div className="navbar-btn-link">
                <button className="navbar-btn" onClick={onAddClick}>
                    <BookmarkPlus size={30} className="navbar-add-btn"/>
                    Add Bookmark
                </button>
            </div>
        </header>
    );
}

