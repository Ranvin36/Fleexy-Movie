import React, { useState } from 'react'
import { SwiperSlide, Swiper, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectCoverflow, Pagination,Navigation } from 'swiper/modules'
import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from 'react-icons/bs'


function ComingSoon({watch, genres}){
    const[movieGenre, setMovieGenre] = useState()


    function GenreName(id) {
        const findGenre = genres.find(genre => genre.id === id);
        if (findGenre) {
          return findGenre.name
        }
      }
      
      
      
    console.log(watch)
    const width = window.innerWidth
    return(
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            initialSlide={3}
            coverflowEffect={{
                rotate:0,
                stretch:0,
                depth: 100,
                modifier:3,
            }}
            className='swiper_container'
            modules={[EffectCoverflow,Pagination,Navigation]}
            pagination={{
                el : '.swiper-pagination',
                clickable:true
            }}
            slideActiveClass='sui'
            
        >
            {watch.map((result,index)=>{
                const movieTitle = result.original_title ? result.original_title : result.original_name
                return(
                    <SwiperSlide key={index} className='swiper3d'>
                            <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} className='comingsoon'/>
                            <div className='swiper3d-details'>
                                <h3>{movieTitle}</h3>
                                <div className='genreItems'>
                                    {result.genre_ids.map((genre)=>{
                                    const MovieGenreName = GenreName(genre)
                                        return <p>{MovieGenreName}</p>
                                    })}
                                </div>
                            </div>
                     </SwiperSlide>
                )
            })}
        </Swiper>

)
}

export default ComingSoon


const SlideNextButton = () =>{
    const swiper = useSwiper()
    return(
        <div className='buttons'>
            <button onClick={() => swiper.slidePrev()} className='slideBtn btn1'><BsFillArrowLeftSquareFill/></button>
            <button onClick={() => swiper.slideNext()} className='slideBtn btn2'><BsFillArrowRightSquareFill/></button>
      </div>
    )
}