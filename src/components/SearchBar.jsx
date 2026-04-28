import { useRef } from 'react';

function SearchBar({ onSearch, searchTerm }) {
    const inputRef = useRef(null);

    function handleClear() {
        onSearch('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <div className='search-container'>
            <input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder='Search country...' 
                className='search-input'
            />
            {searchTerm && (
                <button className="clear-btn" onClick={handleClear}>✕</button>
            )}
        </div>
    );
}

export default SearchBar;