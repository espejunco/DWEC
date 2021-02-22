import React from 'react'
import axios from 'axios'

import {API_URL} from '../utils/urls'
import {handleChange} from '../utils/inputs'

class ProfilePage extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      bio: "The Bio",
      oneLiner: "I'll be back"
    }
    this.handleChange = handleChange.bind(this)
  }

  componentDidMount(){
    console.log("ProfilePage.componentDidMount this.props.user", this.props.user)

    const {bio, favourite_one_liner} = this.props.user.user
    this.setState({bio, oneLiner: favourite_one_liner})

  }


  render(){


    const {user} = this.props
    console.log("ProfilePage.render user", user)

    return(
      <div className="ProfilePage">
        Bienvenido al Home

        <h1>Hola {this.username}</h1>

      </div>
    )
  }
}

export default ProfilePage
