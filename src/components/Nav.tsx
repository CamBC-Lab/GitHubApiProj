 // TODO: Add necessary code to display the navigation bar and link between the pages
  
 import { NavLink } from 'react-router-dom';

 const Nav = () => {
   return (
     <nav className="bg-gray-800 p-4">
       <div className="container mx-auto flex justify-between">
         <NavLink 
           to="/" 
           className={({ isActive }) => 
             `text-white font-bold text-xl hover:text-gray-300 ${isActive ? 'text-blue-400' : ''}`
           }
         >
           Candidate Search
         </NavLink>
         <NavLink 
           to="/SavedCandidates" 
           className={({ isActive }) => 
             `text-white font-bold text-xl hover:text-gray-300 ${isActive ? 'text-blue-400' : ''}`
           }
         >
           Potential Candidates
         </NavLink>
       </div>
     </nav>
   );
 };
 
 export default Nav;