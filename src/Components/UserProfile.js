import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../firebase/userProvider'
import {BsPlayCircle} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import { deleteFavouritesProfile, getFavouritesProfile, getRecentsProfile } from '../firebase/user'
import { useNavigate } from 'react-router-dom'
import PreLoader from './preloader'
import Footer from './footer'

function UserProfile(){

    const User = useContext(UserContext)
    const Navigate = useNavigate()
    const [profileData, setProfileData] = useState([])
    const [recentsData, setRecentsData] = useState([])
    const [dataLoading, setDataLoading] = useState(true)

    function ProfileData(){
        getFavouritesProfile(User, setProfileData)
        setDataLoading(false)
    }
    function Recents(){
        getRecentsProfile(User, setRecentsData)
    }

    function DeleteFavourites(id){
        deleteFavouritesProfile(User, id)
    }

    function PlayNow(id){
        Navigate(`/movies/${id}`)
    }
    console.log(recentsData)

    useEffect(()=>{
        ProfileData()
    },[User])

    useEffect(()=>{
        Recents()
    },[User])

    if(dataLoading){
        return(
            <PreLoader/>
        )
    }
    else{
        return(                    
                <div className='profile'>
                    <div className='profile-details-section'>
                        <div className='profile-details'>
                            <div className='user-img'>
                                <img src='images/man.png'/>
                            </div>
                            {User &&
                                <h3 style={{textTransform:"capitalize"}}>{User.displayName}</h3>}
                        </div>
                    </div>
                    <div className='profile-activity'>
                        <div className='recently-watched'>
                            <h3>Recently Watched</h3>
                            <hr/>
                            <div className='watched-details'>
                                {recentsData && recentsData.slice(0,3).map((movies)=>{
                                    return(
                                        <div className='movie-options'>
                                        <h5>{movies.movieName}</h5>
                                        <div className='movie-icons' style={{cursor:"pointer"}}>
                                            <BsPlayCircle style={{marginRight:"10px"}} size={23} onClick={()=>PlayNow(movies.movieId)}/>
                                            <MdDelete size={23}/>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='recently-watched favourites'>
                            <h3>Your Favourites</h3>
                            <hr/>
                            <div className='watched-details'>
                                {profileData && profileData.map((movie)=>{
                                    return(
        
                                        <div className='movie-options'>
                                            <h5>{movie.movieName}</h5>
                                            <div className='movie-icons' style={{cursor:"pointer"}}>
                                                <BsPlayCircle style={{marginRight:"10px"}} size={23} onClick={()=>PlayNow(movie.movieId)}/>
                                                <MdDelete size={23} onClick={()=>DeleteFavourites(movie.movieId)}/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}

export default UserProfile