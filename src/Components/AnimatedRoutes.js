import { AnimatePresence } from 'framer-motion';

import { Outlet, Navigate, Route, Routes,useParams, useLocation} from 'react-router-dom'
import Contact from './Contact';
import About from './About';
import Menu from './MenuComponents';
import Favorites from './favorites';

 function PrivateRoutes({auth, children}){
    console.log(auth)
    if(!auth){
        return <Navigate to ='/'/>
    }
    return children
 }
//  const PrivateRoutes = ({props,children}) => {
//     console.log(props.auth)
// let user = true
//     if(!user){
//         return <Navigate to ='/'/>
//     }
//     return children
// }

export default function AnimatedRoutes(props){
   
    const location = useLocation();
    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<props.HomePage/>}/>
                <Route path='/home' element={<props.HomePage/>}/>
                <Route path='/menu' element={<Menu dishes={props.dish} />} />
                <Route path='menu/:dishId' element={<props.DishWithId/>}/>
                <Route path='/contact' element={<Contact resetFeedbackForm={props.reset} postFeedback={props.postFeedback}/>} />
                <Route path='/about' element={<About Leaders={props.Leaders} />}/>
                <Route path='/favorites' element={
                <PrivateRoutes auth={props.auth.isAuthenticated}> 
                    <Favorites Favorites={props.Favorites}dishes={props.dish}
                     deleteFavorites={props.deleteFavorites}
                     deleteAllFavorites={props.deleteAllFavorites}/>
                </PrivateRoutes>}
                />
             
                <Route path='*' element={<Navigate to='/'/>}/>
                
              </Routes>
        </AnimatePresence>
    )
}