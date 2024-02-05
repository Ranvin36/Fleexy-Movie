import React, { useEffect, useState } from 'react';
import Homeview from './view';
import { FaArrowRight } from 'react-icons/fa';


const TvSeries = ()=>{
    const [showTv, setShowTv] = useState([])
    const [tvShow , setTvShow] = useState(false)
    useEffect(()=>{
        fetch("https://api.themoviedb.org/3/trending/tv/day?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US")
        .then(response => response.json())
        .then(data=>{
            setShowTv(data.results)
        // console.log(data.results)
    })
    },[])

    var tvShowClick = tvShow ? showTv : showTv.slice(0, 5);

    const tvResult = tvShowClick.map((obj,i)=>{
        return <Homeview movie={obj} index={i} text ="tv"/>
    })

    const tvShowAll = ()=>{
        setTvShow(prevState => !prevState)
    }

    return(
        <div>
            <div className='trending'>
                <h3>Trending Tv-Shows</h3>
                {!tvShow && showTv.length>5 && (
                    <button onClick={tvShowAll} id='show'>Show More <FaArrowRight className='arrow'/></button>
                )}
                {tvShow && showTv.length>5 && (
                    <button onClick={tvShowAll} id='show'>Show Less <FaArrowRight className='arrow'/></button>
                )}
            </div>
            <div className='container'>
                {tvResult}
            </div>
        </div>
    )
}

export default TvSeries;