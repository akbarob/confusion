import { AnimatePresence } from 'framer-motion';

import { Navigate, Route, Routes,useParams, useLocation} from 'react-router-dom'
import Contact from './Contact';
import About from './About';
import Menu from './MenuComponents';

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
                <Route path='*' element={<Navigate to='/'/>}/>
                
              </Routes>
        </AnimatePresence>
    )
}