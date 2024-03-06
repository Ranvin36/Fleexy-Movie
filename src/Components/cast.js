import { isContentEditable } from "@testing-library/user-event/dist/utils"

function Cast({item}){
    const CastNames = String(item.name)
    const CastNamesSplit=(CastNames.split(" "))
    const CastName = item.name.length > 12 ? item.name.slice(0,12) + ".." : item.name
return(
    <div className='castDetails'>
        {item.profile_path &&
        <>
         <img src ={`https://image.tmdb.org/t/p/original${item.profile_path}`} className='castImg'/>
          <p>{CastName}</p>
        </>}
    </div>
)
}

export default Cast