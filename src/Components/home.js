import React, { useState, useLayoutEffect} from 'react';
import Homeview from './view';
import TvSeries from './tv-shows';
import { FaArrowRight } from 'react-icons/fa';
import { FaPlayCircle } from 'react-icons/fa';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import SwiperMovies from './Swipermovies';
import Footer from './footer';
import PreLoader from './preloader';
import ComingSoon from './MiniComps/swiper3d';
import { debounce } from 'lodash';
import { useEffect } from 'react';

const Home = () => {
  const [TvShows, setTvshows] = useState([]);
  const [popular, setPopular] = useState([]);
  const [showAll, setShowAll] = useState([]);
  const [allPopular, setAllPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([])
  const [genres, setGenres] = useState([])
  const [findGenres, setFindGenres] = useState([])
  const [dataLoading, setDataLoading]=useState(false)

  const api = `https://api.themoviedb.org/3/genre/movie/list?&api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en`


  useLayoutEffect(() => {
    setDataLoading(true)
    fetch("https://api.themoviedb.org/3/trending/tv/day?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US")
      .then(response => response.json())
      .then(data => {
        setTvshows(data.results);
      });
    fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US")
      .then(response => response.json())
      .then(data => {
        setPopular(data.results);
      });
    fetch("https://api.themoviedb.org/3/trending/all/day?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US")
      .then(response => response.json())
      .then(data => {
        setAllPopular(data.results);
      });
    fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US")
      .then(response => response.json())
      .then(data => {
        setUpcoming(data.results);
        setDataLoading(false)
      });
  }, []);

  const GenreFetch = debounce(()=>{
    fetch(api)
    .then(response => response.json())
    .then(data=>{
        setGenres(data.genres)
    })
  })

  // function idCheck() {
  //   upcoming.forEach(movie => {
  //     movie.genre_ids.forEach(movieId => {
  //       const foundGenre = genres.find(genre => genre.id === movieId);
  //       if (foundGenre) {
  //         setFindGenres(foundGenre.id);
  //       }
  //     });
  //   });
  // }
  
  
  

  useEffect(()=>{
      GenreFetch()
  },[])

  // useEffect(()=>{
  //   idCheck()
  // },[])

  const tvShow = <SwiperMovies watch={TvShows} text="tvshow"/>;
  const result = <SwiperMovies watch={popular} text="movie" />;
  const all = <SwiperMovies watch={allPopular} text="movie" />;
  const soon = <ComingSoon watch={upcoming} text="movie" genres={genres}/>

  if(dataLoading){
    return(
      <PreLoader/>
    )
  } 
  else{
    return (
      <div>
        <div className='paddingSwiper'>
          <h3>Coming Soon</h3>
          {soon}
        </div>
        <div className='paddingSwiper'>
            <h3>Popular</h3>
             {all}
        </div>
        <div className='paddingSwiper'>
            <h3>Trending Movies</h3>
             {result}
        </div>
        <div className='paddingSwiper'>
          <h3>Trending Tv-Shows</h3>
             {tvShow}
        </div>
        <div style={{marginTop:100}}>
            <Footer/>
        </div>
      </div>
    );
  }
};

export default Home;
