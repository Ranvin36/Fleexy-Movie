import React,{useState} from 'react'
import { debounce } from 'lodash';
import FilterSection from './MiniComps/yearFilter';
import Homeview from './view';
import { useEffect } from 'react';
import { Pagination } from '@mui/material';
import usePagination from '@mui/material/usePagination';
import PaginationComp from './MiniComps/Pagination';
import PreLoader from './preloader';



function ShowsPage(){
    const [genreMovies, setGenreMovies] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [pageChange, setPageChange] = useState(1);
    const [toggled, setToggled] = useState(false);
    const [yearFetch, setYearFetch] = useState(null)
    const[dataLoading,setdataLoading] = useState(true)

  
    const GenreViewApi = `https://api.themoviedb.org/3/discover/tv?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US&page=${activePage}&sort_by=popularity.desc&primary_release_year=${yearFetch}`;
  
    const GenreFetch = debounce(() => {
      fetch(GenreViewApi)
        .then((response) => response.json())
        .then((data) => {
          setGenreMovies(data.results);
          setdataLoading(false)
        });
      }, 800);
  
    useEffect(() => {
      GenreFetch();
    }, [activePage,yearFetch]);
  
  
    const theMovies =
      genreMovies &&
      genreMovies.map((obj, i) => {
        return <Homeview movie={obj} index={i} />;
      });
  
    function FilterYears() {
      const years = [];
      for (let year = 2023; year >= 2000; year--) {
        years.push(year);
      }
      return years;
    }
  
    function DateToggle() {
      setToggled((prevstate) => !prevstate);
    }
  
    function handlePageChange(number) {
      setActivePage(number);
      GenreFetch();
    }
  
    const YearFilter = (year)=>{
      setYearFetch(year)
    }

    if(!dataLoading){
      return(
          <div>
          <div className="Filter">
            <h2>Filter Tv-Shows</h2>
            <FilterSection FilterYears={FilterYears} DateToggle={DateToggle} toggled={toggled} YearFilter={YearFilter}/>
          </div>
    
          <div className="container">{theMovies}</div>
    
          <div>
          <PaginationComp handlePageChange={handlePageChange}/>
          </div>
        </div>
      )
    }
    else{
      return <PreLoader/>
    }
}

export default ShowsPage