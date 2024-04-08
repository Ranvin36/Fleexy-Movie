import { useEffect, useState } from "react";
import Homeview from "./view";
import { debounce } from "lodash";
import FilterSection from "./MiniComps/yearFilter";
import { Pagination } from "@mui/material";
import PaginationComp from "./MiniComps/Pagination";
import PreLoader from "./preloader";


function MoviesPage(){
    const [movieData, setMovieData] = useState([])
    const [pageChange, setPageChange] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [toggled, setToggled] = useState(false);
    const [yearFetch, setYearFetch] = useState(null)
    const[dataLoading, setDataLoading] = useState(true)

    const GenreViewApi = `https://api.themoviedb.org/3/discover/movie?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US&page=${activePage}&sort_by=popularity.desc&primary_release_year=${yearFetch}`;
    const GenreFetch = (() => {
       fetch(GenreViewApi)
          .then((response) => response.json())
          .then((data) => {
            setMovieData(data.results);
            setDataLoading(false)
          });
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
    
      const YearFilter = (year)=>{
        setYearFetch(year)
      }

      function handlePageChange(number) {
        setActivePage(number);
        GenreFetch();
      }

      const MoviesDisplay = movieData && movieData.map((obj,i)=>(
        <Homeview movie={obj} index={i}/>
      ))


      useEffect(()=>{
        GenreFetch()
      },[yearFetch])

    if(dataLoading){
      return <PreLoader/>
    }
    else{
      return(
          <div>
              <div className="Filter">
                  <h2>Filter Movies</h2>
                  <FilterSection FilterYears={FilterYears} DateToggle={DateToggle} toggled={toggled} YearFilter={YearFilter}/>
              </div>
              <div className="container">
                  {MoviesDisplay}
              </div>
              <PaginationComp handlePageChange={handlePageChange}/>
          </div>
      )
    }
}

export default MoviesPage