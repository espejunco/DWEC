import React from 'react'
import axios from 'axios'
import './App.css'

import {API_URL} from './utils/urls'
import RegisterOrLogin from './components/RegisterOrLogin'
import ProfilePage from './components/ProfilePage'

class App extends React.Component{
  state = {
    user: null
  }

  async componentDidMount(){
    const userRes = await axios({
      method: 'GET',
      url: `${API_URL}/me`
    })
    console.log("App.componentDidMount userRes",userRes)
    if(userRes.data){
      this.setState({user: {user: userRes.data}})
    }

  }

  logout = async () => {
    console.log("logout")
    await axios({
      method: 'GET',
      url: `${API_URL}/auth/logout`
    })
    this.setState({user: null})
  }

  render(){
    const {user} = this.state

    return (
      <div className="App">
          Login
        {!user &&
          <RegisterOrLogin updateUser={(user) => this.setState({user})} />
        }
        {user &&
          <div>
            <ProfilePage user={user} />
            <button onClick={this.logout}>Log Out</button>
          </div>
        }
      </div>
    );
  }
}

export default App
