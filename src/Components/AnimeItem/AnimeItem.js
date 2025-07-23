"use client";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AnimeItem.css";

function AnimeItem() {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    episodes,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  const getAnime = async () => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await response.json();
      setAnime(data.data);
    } catch (error) {
      console.error("Error fetching anime details:", error);
    }
  };

  const getCharacters = async () => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/characters`
      );
      const data = await response.json();
      setCharacters(data.data);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    getAnime();
    getCharacters();
  }, [id]);

  return (
    <div className="anime-item-page-wrapper">
      {" "}
      {/* New wrapper for full background */}
      <div className="anime-item-container">
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>

        <div className="details-section-wrapper">
          {/* Background image for the details section */}
          <div
            className="details-background"
            style={{
              backgroundImage: `url(${
                images?.jpg.large_image_url || "/placeholder.svg"
              })`,
            }}
          ></div>
          <div className="details-overlay"></div>

          <div className="details-section-content">
            <div className="anime-poster-wrapper">
              <img
                src={images?.jpg.large_image_url || "/placeholder.svg"}
                alt={title}
                onLoad={() => setImageLoaded(true)}
                className={`anime-poster ${imageLoaded ? "loaded" : ""}`}
              />
              <div className="poster-glow"></div>
            </div>

            <div className="anime-header-and-details">
              <h1 className="anime-main-title">{title || "Loading..."}</h1>
              <div className="anime-info-details">
                <div className="anime-meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Score</span>
                    <span className="meta-value score-value">
                      <i className="fas fa-star"></i>
                      {score || "N/A"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Rank</span>
                    <span className="meta-value">#{rank || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Episodes</span>
                    <span className="meta-value">{episodes || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Status</span>
                    <span className="meta-value status-value">
                      {status || "N/A"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Aired</span>
                    <span className="meta-value">{aired?.string || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Duration</span>
                    <span className="meta-value">{duration || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Season</span>
                    <span className="meta-value">{season || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Rating</span>
                    <span className="meta-value">{rating || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Scored By</span>
                    <span className="meta-value">
                      {scored_by?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Popularity</span>
                    <span className="meta-value">#{popularity || "N/A"}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Source</span>
                    <span className="meta-value">{source || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="synopsis-section">
          <h3 className="section-title">Synopsis</h3>
          <p className="synopsis-text">
            {synopsis
              ? showMore
                ? synopsis
                : synopsis.substring(0, 450) + "..."
              : "Synopsis not available."}
          </p>
          {synopsis && synopsis.length > 450 && (
            <button
              className="read-more-btn"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="trailer-section">
          <h3 className="section-title">Trailer</h3>
          <div className="trailer-container">
            {trailer?.embed_url ? (
              <div className="trailer-wrapper">
                <iframe
                  src={trailer?.embed_url}
                  title={title}
                  width="100%"
                  height="450"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="no-trailer">
                <i className="fas fa-video-slash"></i>
                <h3>Trailer not available</h3>
              </div>
            )}
          </div>
        </div>

        <div className="characters-section">
          <h3 className="section-title">Characters</h3>
          <div className="characters-grid">
            {characters && characters.length > 0 ? (
              characters.map((character, index) => {
                const { role } = character;
                const { images, name, mal_id } = character.character;
                return (
                  <Link
                    to={`/character/${mal_id}`}
                    key={index}
                    className="character-link"
                  >
                    <div className="character-card">
                      <div className="character-image-wrapper">
                        <img
                          src={images?.jpg.image_url || "/placeholder.svg"}
                          alt={name}
                          className="character-image"
                          loading="lazy"
                        />
                        <div className="character-overlay">
                          <span className="character-role">{role}</span>
                        </div>
                      </div>
                      <div className="character-info">
                        <h4 className="character-name">{name}</h4>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="no-characters">
                <i className="fas fa-users-slash"></i>
                <p>No characters found for this anime.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeItem;
