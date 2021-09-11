import React from 'react';
import PageWrapper from "./components/PageWrapper";
import {BrowserRouter as Router,Route,Link ,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

//PAGES
import Home from "./components/Pages/Home.js";
import About from "./components/Pages/About.js";
import Contact from "./components/Pages/Contact.js";
import Login from "./components/Pages/Login.js";
import Blog from "./components/Pages/Blog.js";
import Single from "./components/Pages/Single.js";
import Signup from './components/Pages/Signup.js';

//Admin pages
import Dashboard from './components/Pages/Admin/Dashboard';
import Users from './components/Pages/Admin/Users';
import Posts from './components/Pages/Admin/Posts';
import AddPost from './components/Pages/Admin/AddPost';

import AdminWrapper from "./components/AdminWrapper.js"
import LoginWrapper from "./components/LoginWrapper.js";


class App extends React.Component{
  render(){
  return (
    <div>
    
    <Router>
<Route 
path='/admin/users'
render={props =>{
  return(
  <div>
      {this.props.auth.token ?
        <AdminWrapper>
      <Users/>
      </AdminWrapper>
        : 
        <LoginWrapper>
           <Login/>
        </LoginWrapper>
       
      }
        
      </div>     
)}
  }

 />

<Route
  path='/admin/posts/:view/:id'
  exact={true}
  render={props=>{
    return(
      <div>
      {this.props.auth.token ?
        <AdminWrapper>
      < AddPost />
      </AdminWrapper>
        : 
        <LoginWrapper>
           <Login/>
        </LoginWrapper>
       
      }
        
      </div> 

    )
  }}
/>

<Route
  path='/admin/posts/:view'
  exact={true}
  render={props=>{
    return(
      <div>
      {this.props.auth.token ?
        <AdminWrapper>
      < AddPost />
      </AdminWrapper>
        : 
        <LoginWrapper>
           <Login/>
        </LoginWrapper>
       
      }
        
      </div> 

    )
  }}
/>



<Route 
path='/admin/posts'
exact={true}
render={props =>{
  return(
  <div>
      {this.props.auth.token ?
        <AdminWrapper>
      <Posts />
      </AdminWrapper>
        : 
        <LoginWrapper>
           <Login/>
        </LoginWrapper>
       
      }
        
      </div>     
)}
  }

/>
<Route 
  
  path='/signup'
  exact={true}
  render={ props =>{
    if(this.props.auth.token){
      return(
        <Redirect to="/"></Redirect>
      )
    }else{
      return(
      <LoginWrapper>
        <Signup></Signup>
      </LoginWrapper>
      )
    }
  }}

/>



      <Route
      exact={true}
      path='/admin'
      render={props =>{
        return(
        <div>
            {this.props.auth.token ?
              <AdminWrapper>
            <Dashboard/>
            </AdminWrapper>
              : 
              <LoginWrapper>
                 <Login/>
              </LoginWrapper>
             
            }
              
            </div>     
      )}
        }
      
      />
    
    
          
            <Route exact={true} path="/"
            render={props =>(
              <PageWrapper>
                <Home {...props} />
              </PageWrapper>
            )}
            ></Route>

            <Route
            path="/blog/:slug"
            exact={true}
            render={props =>(
              <PageWrapper>
                <Single {...props} />
                </PageWrapper>
            )}
            />

          <Route
            path="/blog"
            exact={true}
            render={props =>(
              <PageWrapper>
                <Blog {...props} />
              </PageWrapper>
            )}
            />


            <Route
            path="/about"
            render={props =>(
              <PageWrapper>
                <About {...props} />
              </PageWrapper>
            )}
            />
            <Route
            path="/contact"
            render={props =>(
              <PageWrapper>
                <Contact {...props} />
              </PageWrapper>
            )}
            />
            
      
      </Router>
      </div>
  );
}
}

const mapStateToProps=state=>{
  return{
    auth:state.auth
  }
}

const mapDispatchToProps = dispatch =>{
  return{

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
