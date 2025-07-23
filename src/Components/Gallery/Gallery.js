"use client";
import React from "react";
import { useGlobalContext } from "../../context/global";
import { useParams, Link } from "react-router-dom";
import "./Gallery.css";

function Gallery() {
  const { getAnimePictures, Pictures } = useGlobalContext();
  const { id } = useParams();
  const [index, setIndex] = React.useState(0);
  const handleImageClick = (i) => {
    setIndex(i);
  };
  React.useEffect(() => {
    getAnimePictures(id);
  }, [id]);
  return (
    <div className="gallery-page-wrapper">
      {" "}
      {/* New wrapper for full background */}
      <div className="gallery-container">
        {" "}
        {/* This will now hold the max-width and centering */}
        <div className="back">
          <Link to="/">
            <i className="fas fa-arrow-left"></i>
            Back Home
          </Link>
        </div>
        <div className="big-image">
          <img
            src={Pictures[index]?.jpg.image_url || "/placeholder.svg"}
            alt=""
          />
        </div>
        <div className="small-images">
          {Pictures?.map((picture, i) => (
            <div
              className="image-con"
              onClick={() => handleImageClick(i)}
              key={i}
            >
              <img
                src={picture?.jpg.image_url || "/placeholder.svg"}
                alt=""
                style={{
                  border: i === index ? "3px solid #fff" : "3px solid #e5e7eb",
                  filter: i === index ? "grayscale(0)" : "grayscale(60%)",
                  transform: i === index ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.3s ease-in-out",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Gallery;
