import React, { createContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Destination from "./components/Destination/Destination";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Blog from "./components/Blog/Blog";
import Contact from "./components/Contact/Contact";
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
     <Router>
       <Header/>
       <Switch>
         <Route path="/home">
         <Home></Home>
         </Route>
         <Route path="/blog">
         <Blog></Blog>
         </Route>
         <Route path="/contact">
           <Contact></Contact>
         </Route>
         <Route path="/login">
         <Login></Login>
         </Route>
         <PrivateRoute path="/destination/:name">
              <Destination />
         </PrivateRoute>
         <Route exact path="/">
         <Home></Home>
         </Route>
       </Switch>
     </Router>
     </UserContext.Provider>
    
  );
}

export default App;
