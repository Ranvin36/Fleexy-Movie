import React, { useContext, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Logo from './logo';
import {AiOutlineUser} from 'react-icons/ai'
import { UserContext } from '../firebase/userProvider';
import {IoIosArrowDropdownCircle} from 'react-icons/io'
import { HiOutlineBars4 } from "react-icons/hi2";
import { signOutAuth } from '../firebase/auth';
const Navbar = ({setSearchText, searchText})=>{

    const[dropDown, setDropDown]= useState(false)
    const[barsClicked, setBarsClicked]= useState(false)

    const User = useContext(UserContext)    
    const navigate = useNavigate()
    const updateSearchText = (e)=>{
        setSearchText(e.target.value)
        navigate('/search')
    }

    function DropDown(){
        setDropDown((prevState)=>!prevState)
    }
    function BarsDrop(){
        setBarsClicked((prevState)=>!prevState)
    }

    function LogOut(){
        signOutAuth()
    }

    console.log(dropDown)

    return(
        <div className='navbar'>
            <Logo/>
            <ul className={barsClicked ? 'bars-clicked' : null} >
                <li><Link to='/' className='navbarItems'>Home</Link></li>
                <li><Link to='genres' className='navbarItems'>Genres</Link></li>
                <li><Link to='/movies'className='navbarItems'>Movies</Link></li>
                <li><Link to='/tv-shows' className='navbarItems'>Tv-Shows</Link></li>
                <li><Link to='' className='navbarItems'>About Us</Link></li>
                <li><Link to='/' className='navbarItems'>Contact Us</Link></li>
            </ul>
            <div className='miniElements'>
                <div className='search'>
                    <CiSearch className='search-icon' color='#fff'/>
                    <input type='search' aria-label='Search' placeholder='Search' value={searchText} onChange={updateSearchText}/>
                </div>
                {!User ?                 
                    <Link to='/login' className='login'>
                        <div className='static-log'>
                            <AiOutlineUser size={25} color='#fff' />
                            <a>Log In</a>
                        </div>
                    </Link>
                    :
                    <div className='login' style={{"text-decoration":"none"}}>
                        <div className='login-drop'>
                            <div className='static-log'>    
                                <a style={{textTransform:"capitalize", marginRight:"10px"}}>{User.displayName}</a>
                                <IoIosArrowDropdownCircle size={22} color='#fff' onClick={DropDown} className={dropDown? 'arrow rotate' : 'arrow rotate-down'}/>
                            </div>
                            <div className={dropDown?'nav-drop nav-tranform':'nav-drop'}>
                                <li onClick={LogOut} style={{cursor:'pointer'}} >Logout</li>
                                <div className='line' ></div>
                                <Link to='/profile' style={{cursor:'pointer',color:"#000"}} >Profile</Link>
                            </div>
                        </div>
                    </div> 
                }
                
            </div>
            <div className='bars' onClick={BarsDrop}>
                <HiOutlineBars4 size={30} color='#fff'/>
            </div>
        </div>
    )
}

export default Navbar