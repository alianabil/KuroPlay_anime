"use client";
import { useGlobalContext } from "../../context/global";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Upcoming.css";

function Upcoming({ rendered }) {
  const {
    UpcomingAnime = [],
    isSearch,
    searchResults = [],
  } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rendered === "upcoming") {
      return UpcomingAnime?.map((anime) => (
        <div className="anime-card" key={anime.mal_id}>
          <Link to={`/anime/${anime.mal_id}`} className="anime-link">
            <div className="anime-image-wrapper">
              <img
                src={anime.images.jpg.large_image_url || "/placeholder.svg"}
                alt={anime.title}
                className="anime-image"
                loading="lazy"
              />
              <div className="anime-overlay">
                <div className="anime-info">
                  <h3 className="anime-title">{anime.title}</h3>
                  <div className="anime-details">
                    <span className="anime-score">
                      <i className="fas fa-star"></i>
                      {anime.score || "N/A"}
                    </span>
                    <span className="anime-year">
                      {anime.year || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ));
    } else {
      return searchResults?.map((anime) => (
        <div className="anime-card" key={anime.mal_id}>
          <Link to={`/anime/${anime.mal_id}`} className="anime-link">
            <div className="anime-image-wrapper">
              <img
                src={anime.images.jpg.large_image_url || "/placeholder.svg"}
                alt={anime.title}
                className="anime-image"
                loading="lazy"
              />
              <div className="anime-overlay">
                <div className="anime-info">
                  <h3 className="anime-title">{anime.title}</h3>
                  <div className="anime-details">
                    <span className="anime-score">
                      <i className="fas fa-star"></i>
                      {anime.score || "N/A"}
                    </span>
                    <span className="anime-year">
                      {anime.year || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ));
    }
  };

  const getEmptyMessage = () => {
    if (isSearch) {
      return searchResults.length === 0 ? "No search results found" : null;
    }
    return UpcomingAnime.length === 0 ? "Loading upcoming anime..." : null;
  };

  return (
    <div className="upcoming-wrapper">
      <div className="upcoming-container">
        <div className="upcoming-anime">
          {conditionalRender()}
          {getEmptyMessage() && (
            <div className="empty-message">
              <i className="fas fa-search"></i>
              <p>{getEmptyMessage()}</p>
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Upcoming;
