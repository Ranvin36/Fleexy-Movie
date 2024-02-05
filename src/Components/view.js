import React from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Homeview = ({movie, text})=>{
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const movieCheck = movie.original_title ? movie.original_title : movie.original_name
    const detailUrl =  movie.original_title ? `/movies/${movie.id}` : `/tvshows/${movie.id}` 
    console.log(detailUrl)
    return(
        movie.poster_path &&
            (
        <div className='row'>
             <div className='row-img'>
                 <img src={posterUrl}/>
                 <Link to= {detailUrl}><FaPlayCircle className='playBtn'/></Link> 
                <div className='details'>
                    <div className='details-items'>
                        <p>{movieCheck}</p>
                    {console.log(movie.id)}
                    </div>
                </div>
             </div>
             {console.log(movie.original_title)}
        </div>
            )
    )
}

export default Homeview;

