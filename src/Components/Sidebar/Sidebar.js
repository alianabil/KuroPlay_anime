"use client";
import React from "react";
import { useGlobalContext } from "../../context/global";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const { PopularAnime } = useGlobalContext();

  // Pastikan PopularAnime tidak undefined sebelum di-sort
  const sorted = React.useMemo(() => {
    if (!PopularAnime) return [];
    return [...PopularAnime].sort((a, b) => {
      return (b.score || 0) - (a.score || 0); // Handle undefined scores
    });
  }, [PopularAnime]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Top 5 Popular</h3>
        <div className="sidebar-underline"></div>
      </div>
      <div className="sidebar-anime-list">
        {sorted.slice(0, 5).map((anime) => {
          return (
            <Link
              to={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="sidebar-anime-item"
            >
              <div className="sidebar-anime-image-wrapper">
                <img
                  src={anime.images.jpg.small_image_url || "/placeholder.svg"} // Menggunakan small_image_url untuk sidebar
                  alt={anime.title}
                  className="sidebar-anime-image"
                  loading="lazy"
                />
              </div>
              <div className="sidebar-anime-info">
                <h5 className="sidebar-anime-title">{anime.title}</h5>
                <span className="sidebar-anime-score">
                  <i className="fas fa-star"></i>
                  {anime.score || "N/A"}
                </span>
              </div>
            </Link>
          );
        })}
        {sorted.length === 0 && (
          <div className="sidebar-empty-message">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading top anime...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
