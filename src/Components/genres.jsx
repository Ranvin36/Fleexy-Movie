import { useEffect, useState } from "react"
import { debounce } from "lodash"
import Backdrop from "./GenreBackdrop"
import { Link } from "react-router-dom"

function Genres({setGenreId}){
    const [genres ,setGenres] = useState([])
    const Api_Key =  "c82ba3b3f317773b0956fd0c2ce5b8a0"
    const api = `https://api.themoviedb.org/3/genre/movie/list?&api_key=${Api_Key}&language=en`

    function GenrePress(name){
        console.log(name)
        setGenreId(name)
    }

    const GenreFetch = debounce(()=>{
        fetch(api)
        .then(response => response.json())
        .then(data=>{
            setGenres(data.genres)
        })

    })
    useEffect(()=>{
        GenreFetch()
    },[])


    return(
        <div className="GenresLayout">
            <div className="GenresTitle">
                <h1>Categories</h1>
            </div>
            <div className="Genres">
                <div className="GenreDetails">
                    {genres && genres.map((item)=>{
                        return(
                            <Link to={item.name} style={{overflow:'hidden', borderRadius:'10px'}} onClick={()=>GenrePress(item.id)}>
                                <div className="backDrop" style={{background:'url('+Backdrop[item.id]+')', width:'250px', height:'250px', backgroundPosition:'center', backgroundSize:'cover', borderRadius:'10px', position:"relative", transition:"0.5s"}}>
                                    <p className="backdropText">{item.name}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
)
}

export default Genres