import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './auth';
import Chats from './chats';
import Cookies from 'js-cookie';

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      auth: Cookies.get('auth'),
      loading: true
    }
  }
  chAuth(auth) {
    this.setState({
        auth: auth
    }, () => {
      Cookies.set('auth', auth, { secure: true })
    })
  }
  render() {
    return (
    <div className="app">
      <div className="home">
      {
          !this.state.auth ?
          <Auth chAuth={this.chAuth.bind(this)}/>
          :
          <Chats auth={this.state.auth}/>
      }
      </div>
    </div>
    );
  }   
}

ReactDOM.render(<Home />, document.getElementById('root'));