"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react"; // Import useEffect

const GlobalContext = createContext(null);

const baseUrl = "https://api.jikan.moe/v4";

// actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";
const SET_THEME = "SET_THEME"; // Action type untuk tema

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, PopularAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_UPCOMING_ANIME:
      return { ...state, UpcomingAnime: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, AiringAnime: action.payload, loading: false };
    case GET_PICTURES:
      return { ...state, Pictures: action.payload, loading: false };
    case SET_THEME: // Handle SET_THEME action
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  // Inisialisasi tema dari localStorage atau default ke "dark"
  // Pastikan window tersedia sebelum mengakses localStorage
  const initialTheme =
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "dark"
      : "dark";

  const initialState = {
    PopularAnime: [],
    UpcomingAnime: [],
    AiringAnime: [],
    Pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
    theme: initialTheme, // Gunakan tema yang dimuat dari localStorage
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = React.useState("");

  // Efek untuk menyimpan tema ke localStorage setiap kali tema berubah
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", state.theme);
    }
  }, [state.theme]); // Dependency array termasuk state.theme

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      dispatch({ type: SEARCH, payload: [] });
      state.isSearch = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("Please enter a search term");
    }
  };

  // fetch popular anime
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  // fetch upcoming anime
  const getUpcomingAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
    const data = await response.json();
    dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
  };

  // fetch airing anime
  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: data.data });
  };

  // search
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };

  // get anime pictures
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`
    );
    const data = await response.json();
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  // Fungsi untuk mengubah tema
  const toggleTheme = () => {
    dispatch({
      type: SET_THEME,
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  // initial render
  React.useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state, // Sebarkan semua properti state dari reducer
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
        getAnimePictures,
        toggleTheme, // Ekspos fungsi toggleTheme
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
