import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [artist, setArtist] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!search.trim()) {
      return;
    }

    const response = await fetch(
      `https://spotty-24tc.onrender.com/spotify/search?q=${encodeURIComponent(search)}`,
    );

    const data = await response.json();

    console.log(data);

    setResults(data.artists.items);
  };

  useEffect(() => {
    fetch("https://spotty-24tc.onrender.com/spotify/artist/6fWVd57NKTalqvmjRd2t8Z")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArtist(data);
      });
  }, []);

  return (
    <main className="spotify-page">
      <div className="neon-glow glow-green"></div>
      <div className="neon-glow glow-pink"></div>

      <div className="floating-heart heart-one">♥</div>
      <div className="floating-heart heart-two">♥</div>
      <div className="floating-heart heart-three">♥</div>

      <section className="search-container">
        <p className="spotify-label">SPOTIFY DISCOVER</p>

        <h1>
          Find your
          <span> sound.</span>
        </h1>

        <p className="subtitle">
          Search for artists and discover what Spotify has to offer.
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for an artist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

     <div className="results">
  {results.map((artist) => (
    <div className="artist-result" key={artist.id}>
      <div className="record">
        <div className="record-image">
          <img
            src={artist.images[0]?.url}
            alt={artist.name}
          />
        </div>
      </div>

      <div className="artist-info">
        <h2>{artist.name}</h2>
        <p>Artist</p>
      </div>
    </div>
  ))}
</div>
      </section>
    </main>
  );
}

export default App;
