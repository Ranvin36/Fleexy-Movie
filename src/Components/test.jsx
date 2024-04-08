<img src={posterUrl} alt='showcase' className='homeImg'/>
<FaPlayCircle className='playBtn'/> 
  <div className='details'>
      <div className='details-items'>
      {result.original_title ? <>
        <p>{result.original_title}</p>
        <Link to={moviedetails} className='ViewBtn' onClick={()=>recentlyWatched(result.id)} >View More</Link>
      </> :
      <>
        <p>{result.original_name}</p>
        <Link to={showdetails}>View More</Link>
      </>
      }
      </div>
  </div>