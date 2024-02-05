import { isContentEditable } from "@testing-library/user-event/dist/utils"

function Cast({item}){
    const CastNames = String(item.name)
    const CastNamesSplit=(CastNames.split(" "))
return(
    <div className='castDetails'>
        {item.profile_path &&
        <>
         <img src ={`https://image.tmdb.org/t/p/original${item.profile_path}`} className='castImg'/>
          <p>{item.name.slice(0,12)}</p>
        </>}
    </div>
)
}

export default Cast