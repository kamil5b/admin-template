import React, { Component } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode'
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
/**
 * const d = new Date();
const fulldate = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear()
 * 
 * 
 */
// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  state = {
    cookie : Cookies.get(),
    server_on : false
  }
  async componentDidMount(){
    let server = true
    await fetch('http://localhost:8000/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        })
        .catch(err => {
          server=false
          console.log(err)
        });
    console.log(server)
    this.setState({server_on : server})
  }
  
  render() {
    if(!this.state.server_on){
      return <h1 className="text-center"><br/><br/>SERVER MAINTENANCE!</h1>
    }
    if(this.state.cookie.jwt == undefined){
      console.log("MASUK")
      return (
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/Register" name="Register Page" render={props => <Register {...props}/>} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      )
      
    }
      //console.log(this.state.user)
      return (
        <HashRouter>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              </Switch>
            </React.Suspense>
        </HashRouter>
      );
    
  }
}

export default App;
