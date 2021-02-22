import React from 'react'
import axios from 'axios'
import {handleChange} from '../utils/inputs'
import {API_URL} from '../utils/urls'

class RegisterOrLogIn extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      mode: 'login'
    }

    this.handleChange = handleChange.bind(this)
  }


  handleSubmit = async (event) => {
    event.preventDefault()
    const {email, password, mode} = this.state

    let data = {};
    let url = {};

    if(mode === 'login'){
      data = {
        identifier: email,
        password: password
      }
      url = `${API_URL}/auth/local`
    }
    if(mode === 'register'){
      data = {
        email: email,
        username: email,
        password: password
      }
      url = `${API_URL}/auth/local/register`
    }

    const userCreationRes = await axios({
      method: 'POST',
      url,
      data
    })

    console.log("RegisterOrLogin.handleSubmit userCreationRes", userCreationRes)
    if(this.props.updateUser && typeof this.props.updateUser === 'function'){
      localStorage.setItem('user', JSON.stringify(userCreationRes.data))
      this.props.updateUser(userCreationRes.data)
    }
  }

  render(){
    const {email, password, mode} = this.state

    return(
      <div className="RegisterOrLogIn">
        <h1>{mode}</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" value={email} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={this.handleChange} />
          </div>
          <button type="submit">{mode}</button>
        </form>
        {mode === 'login' &&
          <p onClick={() => this.setState({mode: 'register'})}>Aún no tienes cuenta?</p>
        }
        {mode === 'register' &&
          <p onClick={() => this.setState({mode: 'login'})}>Ya tienes cuenta?</p>
        }
      </div>
    )
  }
}

export default RegisterOrLogIn
