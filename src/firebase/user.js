import React, { useState } from 'react'
import {collection, deleteDoc, doc,getDoc,getDocs,setDoc} from 'firebase/firestore'
import { db } from './config'

// const[userData, setUserData]=useState([])


export const createLoginUserDocument = async(user)=>{
    if(user){
        const dbRef = doc(db,"Users",user.uid)
        await setDoc(dbRef,{
            user:user.uid,
            email:user.email,
            name:user.displayName
        })
    }

}

export const recentlyWatchedUserDocument = async(user,movie)=>{
    if(user){
        console.log(user.uid)
        console.log(movie.id)
        const dbref = doc(db,"Activity",user.uid,"Recent",`${movie.id}`)
        await setDoc(dbref,{
            movieName:movie.original_name? movie.original_name : movie.original_title,
            movieId:movie.id,
            user:user.uid
        })
    }
}

export const favouritesUserDocuments = async(user,movie)=>{
    if(user){
        const dbref= doc(db,"Activity",user.uid,"Favourites",`${movie.id}`)
    
        await setDoc(dbref,{
            movieName:movie.original_name? movie.original_name : movie.original_title,
            movieId:movie.id,
            user:user.uid
        })
    }
}

export const deleteFavouritesDocuments = async(user,movie)=>{
    if(user){
        await deleteDoc(doc(db,"Activity",user.uid,"Favourites",`${movie.id}`))
    }
}

export const deleteFavouritesProfile = async(user,id)=>{
    if(user){
        await deleteDoc(doc(db,"Activity",user.uid,"Favourites",`${id}`))
    }
}

export const getFavouritesDocuments = async(user,movie,setFavourites)=>{
    if(user){
        const querySnapshot = await getDocs(collection(db,"Activity",user.uid,"Favourites"))
        querySnapshot.forEach((doc)=>{
            if(doc.data().movieId === movie.id){
                console.log(doc.data().movieId)
                setFavourites(true)
            }
        })
    }
}
export const getRecentsProfile = async(user,setProfileData) =>{
    if(user){
        const querySnapshot = await getDocs(collection(db,"Activity",user.uid,"Recent"))
        const data=[]
        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
            data.push(doc.data())
        })
        setProfileData(data)
    }
}
export const getFavouritesProfile = async(user,setRecentsData) =>{
    if(user){
        const querySnapshot = await getDocs(collection(db,"Activity",user.uid,"Favourites"))
        const data=[]
        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
            data.push(doc.data())
        })
        setRecentsData(data)
    }
}