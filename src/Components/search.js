import React, { useState, useEffect } from 'react';
import Homeview from './view'


const Search = ({searchText, searchResult, setSearchResult})=>{
    const url = `https://api.themoviedb.org/3/search/multi?api_key=c82ba3b3f317773b0956fd0c2ce5b8a0&language=en-US&query=${searchText}&page=1&include_adults=false`
    useEffect(()=>{
        try{
            fetch(url)
            .then(response => response.json())
            .then(data =>{
                setSearchResult(data.results)
            })
        }
        catch(error){
            console.log(error)
        }
    },[searchText])

    const theSearch = searchResult.map((obj, i)=>{
        return <Homeview movie={obj} index ={i} text="movie"/>
    })


    return(
        <div>
            <h1 className='miniTitle'>You Are Searching For: {searchText}</h1>
            <div className='container'>
                {theSearch}
]            </div>
        </div>

    )
}

export default Search