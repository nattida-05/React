import { useState, useMemo, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import './App.css'; // Make sure your CSS is imported

const API = 'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages';

function App() {
    const { data: countries, loading, error } = useFetch(API);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    
    // Load favorites from local storage on first render
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('fav_countries');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to local storage whenever favorites change
    useEffect(() => {
        localStorage.setItem('fav_countries', JSON.stringify(favorites));
    }, [favorites]);

    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    // Calculate badges dynamically
    const regionCounts = useMemo(() => {
        if (!countries) return {};
        return countries.reduce((acc, c) => {
            acc[c.region] = (acc[c.region] || 0) + 1;
            return acc;
        }, { All: countries.length });
    }, [countries]);

    // Filter and Sort Logic
    const filteredAndSorted = useMemo(() => {
        if (!countries) return [];
        return countries
            .filter(c => {
                const matchesSearch = c.name.common.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
                const matchesFav = showOnlyFavorites ? favorites.includes(c.name.common) : true;
                return matchesSearch && matchesRegion && matchesFav;
            })
            .sort((a, b) => {
                if (sortBy === 'name') return a.name.common.localeCompare(b.name.common);
                if (sortBy === 'population') return b.population - a.population;
                return 0;
            });
    }, [countries, searchTerm, selectedRegion, sortBy, showOnlyFavorites, favorites]);

    const toggleFavorite = (e, name) => {
        e.stopPropagation(); // Prevents the modal from opening when clicking the heart
        setFavorites(prev => 
            prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
        );
    };

    if (error) return <div className="error-state">Error: {error}</div>;

    return (
        <div className='app'>
            <header className='app-header'>
                <h1>Country Explorer</h1>
            </header>

            <div className="controls">
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-dropdown">
                    <option value="name">Sort by Name (A-Z)</option>
                    <option value="population">Sort by Population</option>
                </select>
            </div>

            <div className='filter-buttons'>
                {regions.map(r => (
                    <button 
                        key={r} 
                        className={selectedRegion === r && !showOnlyFavorites ? 'active' : ''} 
                        onClick={() => { setSelectedRegion(r); setShowOnlyFavorites(false); }}
                    >
                        {r} <span className="badge">{regionCounts[r] || 0}</span>
                    </button>
                ))}
                <button 
                    className={`fav-filter ${showOnlyFavorites ? 'active' : ''}`} 
                    onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                >
                    ❤️ Favorites <span className="badge">{favorites.length}</span>
                </button>
            </div>

            <div className='country-grid'>
                {loading ? (
                    /* Loading Skeleton */
                    Array(8).fill(0).map((_, i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton-img"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text short"></div>
                        </div>
                    ))
                ) : (
                    /* Actual Data */
                    filteredAndSorted.map(c => (
                        <CountryCard 
                            key={c.name.common} 
                            country={c} 
                            isFavorite={favorites.includes(c.name.common)}
                            onToggleFavorite={(e) => toggleFavorite(e, c.name.common)}
                            onClick={() => setSelectedCountry(c)}
                        />
                    ))
                )}
            </div>

            {/* Detail Modal */}
            {selectedCountry && (
                <div className="modal-overlay" onClick={() => setSelectedCountry(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedCountry(null)}>✕</button>
                        <img src={selectedCountry.flags?.svg} alt="flag" />
                        <h2>{selectedCountry.name.common}</h2>
                        <div className="details">
                            <p><strong>Official Name:</strong> {selectedCountry.name.official}</p>
                            <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
                            <p><strong>Population:</strong> {selectedCountry.population?.toLocaleString()}</p>
                            <p><strong>Region:</strong> {selectedCountry.region}</p>
                            <p><strong>Languages:</strong> {selectedCountry.languages ? Object.values(selectedCountry.languages).join(', ') : 'N/A'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;