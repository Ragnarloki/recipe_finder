import React from 'react'
import Favorites from './components/Favorites'
import Home from './components/Home'
import { Route,BrowserRouter, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Recipe from './components/Recipe'
import Globalstate from './components/GlobalContext'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import { AuthProvider } from './components/AuthContext'
// In a component or main app
import 'bootstrap/dist/css/bootstrap.min.css';  // Example for importing Bootstrap
import './index.css'; // Import your custom styles


function App() {
  return (
    <div>
      <AuthProvider>      
       <BrowserRouter>
        <Globalstate>
         <Navbar/>
           <Routes>
             <Route path='/food_recipe_finder/' element={<Home/>}/>
             <Route path='/food_recipe_finder/favorites/' element={<Favorites/>}/>
             <Route path='/food_recipe_finder/recipe/:id' element={<Recipe/>}/>
             <Route path='/food_recipe_finder/login' element={<LoginPage/>}/>
             <Route path='/food_recipe_finder/signup' element={<SignUpPage/>}/>
           
           </Routes>
        </Globalstate>  
       </BrowserRouter>
      </AuthProvider> 
    </div>
  )
}

export default App