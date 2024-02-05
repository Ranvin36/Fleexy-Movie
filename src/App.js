import Navbar from './Components/navbar.js'
import Home from './Components/home.js'
import Services from './Components/services.js'
import Search from './Components/search.js'
import MovieDetails from './Components/moviedetails.js'
import ShowsDetails from './Components/showsDetails.js'
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Signup from './Components/signup.js'
import { useContext, useState } from 'react';
import Genres from './Components/genres.jsx'
import GenresView from './Components/GenresView.jsx'
import Login from './Components/login.js'
import './firebase/config.js'
import { UserContext, UserProvider } from './firebase/userProvider.js'
import MoviesPage from './Components/MoviesPage.js'
import ShowsPage from './Components/showsPage.js'
import UserProfile from './Components/UserProfile.js'
import Footer from './Components/footer.jsx'
import Page404 from './Components/404.js'
import PasswordReset from './Components/passReset.js'
import { Navigate } from 'react-router-dom'


function App() {
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [genreId,setGenreId] = useState(0)

  const authcx = useContext(UserContext)
  function ChechAuth(){
    return authcx && authcx
  }

  return (
    <div className="App">
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <Routes>

            {/* Static Paths */}
            <Route path='/' element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path='/genres' element={<Genres setGenreId={setGenreId} />} />
            {!authcx && <Route path='/login' element={ <Login />}/>}
            <Route path='/login' element={authcx ? <Navigate to='/' /> : <Login />} />
            <Route path='/signup' element={authcx ? <Navigate to='/' /> : <Signup />} />


            <Route path='/search' element={<Search searchText={searchText} searchResult={searchResult} setSearchResult={setSearchResult} />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/tv-shows' element={<ShowsPage />} />
            <Route path='profile' element={<UserProfile />} /> :
            <Route path='password-reset' element={<PasswordReset />} /> :
            <Route path='*' element={<Page404/>} />


            {/* Dynamic Paths */}
            <Route path='/tvshows/:id' element={<ShowsDetails/>} />
            <Route path='/movies/:id' element={<MovieDetails />} />
            <Route path='/genres/:id' element={<GenresView genreId={genreId}/>} />
            <Route path='/genres/:id/movies/:id' element={<MovieDetails/>} />
            <Route path='/search/movies/:id' element={<MovieDetails />} />
            <Route path='/search/tvshows/:id' element={<ShowsDetails />} />
        </Routes>
    </div>
  );
}

export default App;
