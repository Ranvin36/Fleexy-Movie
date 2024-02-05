import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';
import {BsYoutube, BsFacebook, BsInstagram} from 'react-icons/bs'


function Footer(){
    return(
        <div className='footer'>
            <div className="footer-content">
                <div className="footer-nav-container">
                    <div className="footer-heading">
                        <Logo size={35}/>
                        <p color='#fff'>In FLEEXY Will Be Providing The Latest Movies & Tv-Shows For Free.</p>
                        <div className="social-media">
                            <a href="/" className="platform-icon">
                                <BsYoutube color='#fff' size={18}/>
                            </a>
                            <a href="/" className="platform-icon">
                                <BsFacebook color='#fff'size={18}/>
                            </a>
                            <a href="/" className="platform-icon">
                                <BsInstagram color='#fff' size={18}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-nav-basis">
                    <div className="footer-nav">
                        <h3>Shortcuts</h3>
                        <a href=""><Link>Home</Link></a>
                        <a href=""><Link>Genre</Link></a>
                        <a href=""><Link>Movies</Link></a>
                        <a href=""><Link>Tv-Shows</Link></a>
                        <a href=""><Link>Search</Link></a>
                    </div>
                    <div className="footer-nav">
                        <h3>Genres</h3>
                        <a href=""><Link>Action</Link></a>
                        <a href=""><Link>Adventure</Link></a>
                        <a href=""><Link>Comedy</Link></a>
                        <a href=""><Link>Romance</Link></a>
                    </div>
                    <div className="footer-nav">
                        <h3>Policy</h3>
                        <a href=""><Link>Home</Link></a>
                        <a href=""><Link>Home</Link></a>
                        <a href=""><Link>Home</Link></a>
                    </div>
                    <div className="footer-nav">
                        <h3>Policy</h3>
                        <a href=""><Link>Home</Link></a>
                        <a href=""><Link>Home</Link></a>
                        <a href=""><Link>Home</Link></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer