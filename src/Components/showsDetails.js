import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {HiStar} from 'react-icons/hi'
import {BiCalendar, BiCategoryAlt} from 'react-icons/bi'
import { debounce } from 'lodash';
import Cast from './cast';
import PreLoader from './preloader';
import { IoIosHeartEmpty,IoMdHeart } from "react-icons/io";
import { UserContext } from '../firebase/userProvider';
import { favouritesUserDocuments, deleteFavouritesDocuments, getFavouritesDocuments } from '../firebase/user';
import { lazy } from 'react';


function ShowsDetails(){

    const user = useContext(UserContext)
    const navigate = useNavigate()
    const[favourites,setFavourites] = useState(false)
    const [tvshows, setTvShow] = useState([])
    const [season, setSeason] = useState(1)
    const [cast ,setCast] = useState([])
    const [episode, setEpisode] = useState(1)
    const [fetchSeason, setFetchSeason] = useState(1)
    const {id} = useParams()
    const tvApi =`https://api.themoviedb.org/3/tv/${id}?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US` 
    const ShowFetch = debounce(() => {
        console.log('TV Show ID:', id);
        fetch(tvApi)
        .then(response => response.json())
        .then(data=>{
            setTvShow(data);
        })
    },750);
    
    const posterUrl = `https://image.tmdb.org/t/p/original${tvshows.poster_path}`
    const backdropUrl = `https://image.tmdb.org/t/p/original${tvshows.backdrop_path}`
    const videoid = `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
    let Season= 0

    function EpisodesFetch(name){
        setSeason(name)
    }

    async function EpisodeDetails(){
        const FetchUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US`
        console.log(FetchUrl)
        const response = await fetch(FetchUrl)
        const data = await response.json()
        setFetchSeason(data)
    }

    function EpisodesClick(number){
        setEpisode(number)
    }

    function favouritesClick(){
        if(user){
            setFavourites((state)=> !state)
            favouritesUserDocuments(user,tvshows)
            if(favourites){
                console.log("CHECKED!!")
                deleteFavouritesDocuments(user,tvshows)
            }
        }else{
            navigate('/login')
        }
    }

    useEffect(()=>{
        EpisodeDetails()
    },[season,id])

    useEffect(()=>{
        ShowFetch()
    },[])

    useEffect(()=>{
        getFavouritesDocuments(user,tvshows,setFavourites)
    },[user,tvshows])


    async function FetchCast(){
        const CastUrl =  `https://api.themoviedb.org/3/tv/${id}/credits?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US`
        const response = await fetch(CastUrl)
        const data = await response.json()
        setCast(data)
    }

    useEffect(()=>{
        FetchCast()
    },[])

    if(!tvshows.original_name){
        return <PreLoader/>
    }
    else{

        return(
            <>
            <div className='movieData'>
                  <div className='img-text' style={{background: 'linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('+ backdropUrl +')', backgroundPosition:'center', backgroundSize:'cover', paddingLeft:20}}>
                       <h1>{tvshows.original_name}</h1>
                       <div className='posterPadding'>
                           <div className='posterimg'>
                               <img src={posterUrl}/>
                           </div>
                           <div className='postertext'>
                               <p>{tvshows.overview}</p>
                               <div className='subDetails'>
                                   <HiStar size={30} color='yellow'/>
                                   <p>{Math.round(tvshows.vote_average * 100) /100}</p>
                               </div>
                               <div className='subDetails'>
                                   <BiCalendar size={30} color='yellow'/>
                                   <p>{tvshows.release_date}</p>
                               </div>
                               <div className='subDetails'>
                                <BiCategoryAlt size={30} color='yellow'/>
                               {tvshows.genres && tvshows.genres.map((item)=>{
                                return(
                                        <p> {item.name} ,</p>
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
                  <div className='ShowDetails'>
                    <div className='showSeasons'>
                        {tvshows.seasons && tvshows.seasons.map((item)=>{
                            return(
                                <div className='ShowSeasons' onClick={()=>EpisodesFetch(item.season_number)}>
                                        <a>{item.name}</a>
                                </div>
                            )
                        })}
                    </div>
                    <div >    
                        <div className='episodesDetails'>
    
                        {fetchSeason.episodes && fetchSeason.episodes.map((item)=>{
                            return(
                                <div className='ShowEpisodes' onClick={()=>EpisodesClick(item.episode_number)}>
                                        <a>{item.episode_number}.{item.name}</a>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                  </div>
                  <div className='cast'>
                        <h1>Cast</h1>
                        <div className='castProfiles'>
    
                        {cast.cast && cast.cast.slice(0,50).map((item)=>{
                            return(
                                <Cast item={item}/>
                            )
                        })}
                        </div>
                  </div>
              </div> 
            </>
        )
    }
    
}

export default ShowsDetails