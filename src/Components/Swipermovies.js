import React, { useContext } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination} from 'swiper/modules'
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import { UserContext } from '../firebase/userProvider';
import { recentlyWatchedUserDocument } from '../firebase/user';



function SwiperMovies({watch ,index, text}){
  const width = window.innerWidth
  const User = useContext(UserContext)


    return(
        <div className=''>
            <Swiper 
              modules={[Pagination]}
              // onSlideChange={() => console.log("Changed")}
              spaceBetween={-10}
              slidesPerView={width >= 1300 ? 5 : width >= 1200 ? 4 : width >= 900 ? 3 : 1}
              pagination={{clickable:true}}
              // onSwiper={(swiper) => console.log(swiper)}
              >
              
              
              <SlideNextButton/>
              {watch.map((result,index)=>{
                const posterUrl = `https://image.tmdb.org/t/p/w500${result.poster_path}`
                const moviedetails = `movies/${result.id}`
                const showdetails = `tvshows/${result.id}`
                function recentlyWatched(id){
                  recentlyWatchedUserDocument(User,result)
                }
                return(
                  <SwiperSlide key={index}> 
                <div className='slider'>
                    <div className='row row-home'>
                      <div className='row-img' style={width< 600?{width:"100%"} : {width:"100%"}}>
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
                      </div>
                    </div>
                </div>
                </SwiperSlide>
                
                )
              })}
            </Swiper>
           
      </div>
    )
}

export default SwiperMovies

const SlideNextButton = () => {
    const swiper = useSwiper();
  
    return (
      <div className='buttons'>
        <button onClick={() => swiper.slidePrev()} className='slideBtn btn1'><BsFillArrowLeftSquareFill/></button>
        <button onClick={() => swiper.slideNext()} className='slideBtn btn2'><BsFillArrowRightSquareFill/></button>
      </div>
    );
  };
  