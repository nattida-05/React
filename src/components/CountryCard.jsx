function CountryCard({ country, isFavorite, onToggleFavorite, onClick }) {
    if (!country) return null;

    const pop = country.population?.toLocaleString() || '0';
    const cap = country.capital?.[0] || 'N/A';

    return (
        <div className='country-card' onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="flag-container">
                <img 
                    src={country.flags?.svg || 'https://via.placeholder.com/150'} 
                    alt={'Flag of ' + (country.name?.common || 'Unknown')} 
                    className='country-flag' 
                />
                <button 
                    className={`fav-btn ${isFavorite ? 'active' : ''}`}
                    onClick={onToggleFavorite}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div className='country-info'>
                <h3>{country.name?.common || 'Unknown Country'}</h3>
                <p><strong>Capital:</strong> {cap}</p>
                <p><strong>Population:</strong> {pop}</p>
            </div>
        </div>
    );
}

export default CountryCard;