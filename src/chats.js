import React from 'react';
import ChatsList from './chats/list';
import ChatMessages from './chats/messages'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import $ from "jquery";

class Chats extends React.Component {
  constructor() {
    super()
    this.state = {
      msgLoading: false,
      index: "all",
      current_chat: {
        abs_object: {title: "خانه"}
      },
      chats: [],
      mainChats: {},
      messages: {},
      lastMsgid: 0
    }
    this.chChat = this.chChat.bind(this)
    this.getChats = this.getChats.bind(this)
    this.getMessages = this.getMessages.bind(this)
  }
  menu() {
    $(".contacts_card, .msg_card").toggle()
  }
  getChats() {
    !this.state.chats.length &&
      this.setState({chats: []})

    axios.post('chats?auth=' + this.props.auth)
    .then((res) => {
      console.log(res.data)
      if(!res.data) this.setState({chats: false})
      else
        this.setState({
          chats: res.data.chats
        })
    })
    .catch(err => this.setState({chats: false}))
  }
  getMessages() {
    if(this.state.messages.old_has_continue) {
      this.setState({msgLoading: true, messages: []})
      axios.post(`messages?auth=${this.props.auth}&object_guid=${this.state.current_chat.object_guid}&msg_id=${this.state.lastMsgid}`)
      .then((res) => {
        console.log(res.data)
        if(!res.data) this.setState({messages: false, msgLoading: false})
        else {
          this.setState({
            messages: res.data,
            lastMsgid: res.data.old_max_id,
            msgLoading: false
          })
        }
      })
      .catch(err => this.setState({messages: false, msgLoading: false}))  
    } else window.location.reload()
  }
  chChat(index) {
    index === "all" ?
      this.setState({
        index: "all",
        current_chat: {
          abs_object: {title: "خانه"}
        }
      }) :
      this.state.chats[index] !== this.state.current_chat &&
        this.setState({
          index: index,
          current_chat: this.state.chats[index]
        })
  }
  componentDidMount() {
    $("body").width() < 800 &&
      $(".msg_card").hide()
    $(window).on("resize", () => {
      $("body").width() < 800 ?
        $(".msg_card").hide() :
        $(".msg_card, .contacts_card").show()
    })

    !this.state.chats.length &&
      axios.post('chats?auth=' + this.props.auth)
      .then((res) => {
        console.log(res.data)
        if(!res.data) this.setState({chats: false})
        else
          this.setState({
            chats: res.data.chats,
            mainChats: res.data
          })
      })
      .catch(err => this.setState({chats: false}))
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.current_chat.object_guid !== this.state.current_chat.object_guid && this.state.index !== "all") {
      this.setState({msgLoading: true, messages: []})
      $("body").width() < 800 &&
        $(".contacts_card, .msg_card").toggle()
      
      axios.post(`messages?auth=${this.props.auth}&object_guid=${this.state.current_chat.object_guid}&msg_id=${this.state.current_chat.last_message_id}`)
        .then((res) => {
          console.log(res.data)
          if(!res.data) this.setState({messages: false, msgLoading: false})
          else
            this.setState({
              messages: res.data,
              lastMsgid: res.data.old_max_id,
              msgLoading: false
            })
        })
        .catch(err => this.setState({messages: false, msgLoading: false}))  
    }
  }
  render() {
    return (
    <div className="chats-container">
        {this.state.index !== "all" &&
        <div className="menu" onClick={this.menu}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        }
        <ChatMessages 
          index={this.state.index}
          loading={this.state.msgLoading}
          chat={this.state.current_chat}
          chats={this.state.chats}
          mainchats={this.state.mainChats}
          messages={this.state.messages}
          retry={this.getMessages}
          auth={this.props.auth}
        />
        <ChatsList 
          chats={this.state.chats}
          retry={this.getChats}
          chChat={this.chChat}
          current_chat={this.state.current_chat}
        />
    </div>
    );
  }   
}

export default Chats