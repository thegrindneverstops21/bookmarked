import { Search, Bell, ChevronDown } from 'lucide-react'

interface NavbarProps {
    username: string;
    avatar?: string;
    onSearch?: (query: string) => void;
}

export default function Navbar({ username, avatar, onSearch }: NavbarProps) {
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
            {/*Icon & Profile*/}
            <div className='navbar-action'>
                <button className='navbar-icon-btn'>
                    <Bell size={20} />
                    <span className='navbar-dot' />
                </button>

                <button className='navbar-profile'>
                    {avatar ? (
                        <img src= {avatar} alt={username} className='navbar-avatar' />
                    ): (
                        <div className='navbar-avatar-fallback'>
                            {username.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className='navbar-username'>{username}</span>
                    <ChevronDown size={16} className='navbar-chevron' />
                </button>
            </div>
        </header>
    );
}

