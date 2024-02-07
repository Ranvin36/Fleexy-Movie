import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {LuVote} from 'react-icons/lu'
import {HiStar} from 'react-icons/hi'
import {BiCalendar, BiCategoryAlt} from 'react-icons/bi'
import PreLoader from './preloader';
import Cast from './cast';
import {debounce} from "lodash"
import { IoIosHeartEmpty,IoMdHeart } from "react-icons/io";
import { UserContext, UserProvider } from '../firebase/userProvider';
import { deleteFavouritesDocuments, favouritesUserDocuments, getFavouritesDocuments } from '../firebase/user';
import { lazy } from 'react';



const MovieDetails = ()=>{
    const user = useContext(UserContext)
    const navigate = useNavigate()
    const [details, setDetails] = useState([])
    const [cast, setCast] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const[favourites, setFavourites] = useState(false)
    const {id} = useParams()
    const screenWidth = useRef([window.innerWidth])
    const idFetch = `https://api.themoviedb.org/3/movie/${id}?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US`
    const MovieDetailsFetch= debounce(()=>{
        fetch(idFetch)
        .then(response => response.json())
        .then(data=>{
            setDetails(data)
        })
    },750)
   const posterUrl = `https://image.tmdb.org/t/p/original${details.poster_path}`
   const backdropUrl = `https://image.tmdb.org/t/p/original${details.backdrop_path}`
   const videoid = `https://multiembed.mov/?video_id=${id}&tmdb=1`
   const CastImg = `https://image.tmdb.org/t/p/original${cast.profile_path}`

    async function FetchCast(){
        const CastUrl =  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US`
        const response = await fetch(CastUrl)
        const data = await response.json()
        setCast(data)
        setDataLoading(false)
    }

    const screenSize =screenWidth.current[0]

    function favouritesClick(){
        if(user){
            setFavourites((state)=> !state)
            favouritesUserDocuments(user,details)
            if(favourites){
                deleteFavouritesDocuments(user,details)
            }
        }else{
            navigate('/login')
        }
    }

    useEffect(()=>{
        FetchCast()
    },[])

    useEffect(()=>{
        MovieDetailsFetch()
    },[])

    useEffect(()=>{
        getFavouritesDocuments(user,details,setFavourites)
    },[user,details])

    if(!details.original_title){
        return <PreLoader/>
    }
    else{

        return (
           <div className='movieData'>            

               <div className='img-text' style={{background: 'linear-gradient(150deg, rgba(0,0,0,0.6582282571231617) 35%, rgba(56,0,255,0.3450629910167192) 100%),url('+ backdropUrl +')', backgroundPosition:'center', backgroundSize:'cover', paddingLeft:20}}>
                    <h1>{details.original_title}</h1>
                    <div className='posterPadding'>
                        <div className='posterimg' style={screenSize<1000?{display:"none"}:null}>
                            <img src={posterUrl}/>
                        </div>
                        <div className='postertext'>
                            <p>{details.overview}</p>
                            <div className='subDetails'>
                                <HiStar size={30} color='yellow'/>
                                <p>{Math.round(details.vote_average * 100) /100}</p>
                            </div>
                            <div className='subDetails'>
                                <BiCalendar size={30} color='yellow'/>
                                <p>{details.release_date}</p>
                            </div>
                            <div className='subDetails'>
                             <BiCategoryAlt size={30} color='yellow'/>
                            {details.genres && details.genres.map((item)=>{
                             return(
                                     <p>{item.name},</p>
                                     )
                                 })}
                         </div>
                        </div>
                        <div className='favouritesBtn' onClick={favouritesClick} style={favourites?{backgroundColor:"#fff"}:{backgroundColor:"#fa7ac5ff"}}>
                            {favourites? <IoMdHeart color='#fa7ac5ff' size={30}/> : <IoIosHeartEmpty color='#fff' size={30}/>}
                        </div>
                    </div>
               </div>
               <div className='player'>
                <lazy>
                    <iframe src={videoid} className='videoPlayer' allowFullScreen noresize="noresize"></iframe>
                </lazy>
               </div>
               <div className='cast'>
                     <h1>Cast</h1>
                     <div className='castProfiles'>
                     {cast.cast && cast.cast.slice(0,20).map((item)=>{
                         return(
                             <Cast item={item}/>
                         )
                     })}
                     </div>
               </div>
           </div> 
    
        )
    
    }
}

export default MovieDetails