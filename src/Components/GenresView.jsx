import { debounce } from "lodash";
import { createElement, useEffect, useState } from "react";
import Homeview from "./view";
import Pagination from "react-js-pagination";
import { BiDownArrow } from "react-icons/bi";
import FilterSection from "./MiniComps/yearFilter";
import PaginationComp from "./MiniComps/Pagination";
import PreLoader from "./preloader";

function GenresView({ genreId }) {
  const [genreMovies, setGenreMovies] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageChange, setPageChange] = useState(1);
  const [toggled, setToggled] = useState(false);
  const [yearFetch, setYearFetch] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)

  const GenreViewApi = `https://api.themoviedb.org/3/discover/movie?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US&page=${activePage}&with_genres=${genreId}&sort_by=popularity.desc&primary_release_year=${yearFetch}`;

  const GenreFetch = debounce(() => {
    fetch(GenreViewApi)
      .then((response) => response.json())
      .then((data) => {
        setGenreMovies(data.results);
        setDataLoading(false)
      });
  }, 800);
  console.log(genreMovies);

  useEffect(() => {
    GenreFetch();
  }, [activePage, genreId,yearFetch]);


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
    console.log(number);
  }

  const YearFilter = (year)=>{
    setYearFetch(year)
  }

  if(dataLoading){
    return <PreLoader/>
  }
  else{
    return (
      <div>
        <div className="Filter">
          <h2>Filter Movies</h2>
          <FilterSection FilterYears={FilterYears} DateToggle={DateToggle} toggled={toggled} YearFilter={YearFilter}/>
        </div>
  
        <div className="container">{theMovies}</div>
  
        <div>
           <PaginationComp handlePageChange={handlePageChange}/>
        </div>
      </div>
    );
  }
}

export default GenresView;
