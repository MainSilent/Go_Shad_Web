(this.webpackJsonpgoshad=this.webpackJsonpgoshad||[]).push([[0],{20:function(t,e,a){t.exports=a(43)},43:function(t,e,a){"use strict";a.r(e);var s=a(2),n=a(3),c=a(5),i=a(4),r=a(0),l=a.n(r),o=a(19),h=a.n(o),u=a(6),m=a(7),d=a.n(m),g=function(t){Object(c.a)(a,t);var e=Object(i.a)(a);function a(){var t;return Object(s.a)(this,a),(t=e.call(this)).state={signInData:{},sendCode:!1,auth:"",number:"",code:"",btn:"Send Number"},t.number=t.number.bind(Object(u.a)(t)),t.code=t.code.bind(Object(u.a)(t)),t.login=t.login.bind(Object(u.a)(t)),t}return Object(n.a)(a,[{key:"number",value:function(t){/^(\s*|\d+)$/.test(t.target.value)&&this.setState({number:t.target.value})}},{key:"code",value:function(t){/^(\s*|\d+)$/.test(t.target.value)&&this.setState({code:t.target.value})}},{key:"login",value:function(){var t=this;this.state.sendCode?6===this.state.code.length?(d.a.post("signIn?phone_number=".concat(this.state.number.replace(/0/,"98"),"&code=").concat(this.state.code,"&data=").concat(JSON.stringify(this.state.signInData))).then((function(e){console.log(e.data),"OK"!==e.data.status&&"OK"!==e.data.status_det?t.setState({btn:"Error: try again"}):"OK"!==e.data.status?t.setState({btn:"Invalid: try again"}):t.props.chAuth(e.data.data.auth)})).catch((function(e){return t.setState({btn:"Error: try again"})})),this.setState({btn:"Send Code..."})):this.setState({btn:"Wrong format"}):11===this.state.number.length&&/^(\+98|0098|98|0)?9\d{9}$/.test(this.state.number)?(d.a.post("login?phone_number="+this.state.number.replace(/0/,"98")).then((function(e){console.log(e.data),"OK"===e.data.status&&"OK"===e.data.status_det?(t.setState({btn:"Send Code"}),t.setState({signInData:e.data,sendCode:!0}),document.getElementById("code").style.display="block"):t.setState({btn:"Error: try again"})})).catch((function(e){return t.setState({btn:"Error: try again"})})),this.setState({btn:"Send Number..."})):this.setState({btn:"Wrong format"})}},{key:"render",value:function(){return l.a.createElement("div",{className:"form"},l.a.createElement("div",{className:"forceColor"}),l.a.createElement("div",{className:"topbar"},l.a.createElement("img",{src:"assets/images/icon.png",alt:"\u06af\u0634\u0627\u062f"}),l.a.createElement("div",{className:"spanColor"}),l.a.createElement("input",{onChange:this.number,value:this.state.number,type:"text",maxLength:"11",className:"input",id:"number",inputMode:"numeric",placeholder:"Phone Number"}),l.a.createElement("input",{onChange:this.code,value:this.state.code,type:"text",maxLength:"6",className:"input",id:"code",inputMode:"numeric",placeholder:"Verification Code"})),l.a.createElement("button",{className:"submit",id:"submit",onClick:this.login},this.state.btn),l.a.createElement("a",{href:"https://github.com/MainSilent/Go_Shad_Web"},"\u0622\u06cc\u0627 \u0627\u06cc\u0646 \u0648\u0628 \u0633\u0627\u06cc\u062a \u0627\u0645\u0646 \u0647\u0633\u062a\u061f"))}}]),a}(l.a.Component),p=a(8),v=a.n(p),b=function(t){Object(c.a)(a,t);var e=Object(i.a)(a);function a(){return Object(s.a)(this,a),e.apply(this,arguments)}return Object(n.a)(a,[{key:"openChat",value:function(t){v()(".contacts li").removeClass("active"),"all"===t&&this.props.chats?(v()(".chat_all").addClass("active"),this.props.chChat("all")):(v()(".chat_".concat(t)).addClass("active"),this.props.chChat(t))}},{key:"render",value:function(){var t=this;return l.a.createElement("div",{className:"card contacts_card"},!1===this.props.chats?l.a.createElement("p",{className:"retry-btn",onClick:this.props.retry},"Error: Try again"):this.props.chats.length?l.a.createElement("div",{className:"card-body contacts_body",dir:"rtl"},l.a.createElement("ul",{className:"contacts"},l.a.createElement("li",{className:"chat_all active",onClick:function(){return t.openChat("all")}},l.a.createElement("div",{className:"d-flex bd-highlight"},l.a.createElement("div",{className:"user_info"},l.a.createElement("span",null,"\u062e\u0627\u0646\u0647"),l.a.createElement("p",null)))),this.props.chats.map((function(e,a){return l.a.createElement("li",{key:a,className:"chat_".concat(a),onClick:function(){return t.openChat(a)}},l.a.createElement("div",{className:"d-flex bd-highlight"},l.a.createElement("div",{className:"user_info"},l.a.createElement("span",null,e.abs_object.title),l.a.createElement("p",null,e.last_message.text))))})))):l.a.createElement("div",{className:"spinner"},l.a.createElement("div",{className:"spinner-item"}),l.a.createElement("div",{className:"spinner-item"}),l.a.createElement("div",{className:"spinner-item"})))}}]),a}(l.a.Component),_=function(t){Object(c.a)(a,t);var e=Object(i.a)(a);function a(){var t;return Object(s.a)(this,a),(t=e.call(this)).state={url:"",loading:!1},t}return Object(n.a)(a,[{key:"formatDate",value:function(t){var e=new Date(1e3*parseInt(t));return"".concat(e.getHours(),":").concat((e.getMinutes()<10?"0":"")+e.getMinutes()," ").concat(e.getFullYear(),"/").concat(e.getMonth(),"/").concat(e.getDate())}},{key:"timeConvert",value:function(t){if(!t)return"N/A";var e=t/60,a=Math.floor(e),s=60*(e-a),n=Math.round(s);return a+":"+(n<10?"0":"")+n}},{key:"play",value:function(t,e){var a=this;this.setState({loading:!0}),this.state.url?(e?window.open(this.state.url):window.open("video.html?url="+this.state.url),this.setState({loading:!1})):d.a.post("getUrl?auth=".concat(this.props.auth,"&access_token=").concat(t.access_token,"&live_id=").concat(t.live_id)).then((function(t){console.log(t.data),t.data?a.setState({url:t.data.play_url,loading:!1},(function(){e?window.open(t.data.play_url):window.open("video.html?url="+t.data.play_url)})):a.setState({loading:!1})})).catch((function(t){return a.setState({loading:!1})}))}},{key:"render",value:function(){var t=this;return l.a.createElement("li",null,l.a.createElement("figure",{className:"grid__figure"},l.a.createElement("img",{src:"data:image/jpeg;base64, ".concat(this.props.message.live_data.thumb_inline),className:this.props.message.live_data.live_status.can_play?"":"cantplay",alt:""}),this.props.message.live_data.live_status.can_play?l.a.createElement("div",{className:"live_detail"},l.a.createElement("p",null,this.timeConvert(this.props.message.live_data.live_status.duration)),this.state.loading?l.a.createElement("p",{className:"text-loader"},"..."):l.a.createElement(l.a.Fragment,null,l.a.createElement("img",{src:"assets/images/download.png",onClick:function(){return t.play(t.props.message.live_data,!0)},style:"InProgress"===this.props.message.live_data.live_status.status?{visibility:"hidden"}:{},alt:"download"}),l.a.createElement("img",{src:"assets/images/play.png",onClick:function(){return t.play(t.props.message.live_data)},alt:"play"}))):l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"N/A"),l.a.createElement("div",{className:"live_detail"},l.a.createElement("p",null,this.timeConvert(this.props.message.live_data.live_status.duration)))),l.a.createElement("figcaption",null,this.formatDate(this.props.message.time))))}}]),a}(l.a.Component),E=function(t){Object(c.a)(a,t);var e=Object(i.a)(a);function a(){return Object(s.a)(this,a),e.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){var t=this;return l.a.createElement("div",{className:"card msg_card"},l.a.createElement("div",{className:"card-header msg_head"},l.a.createElement("div",{className:"d-flex bd-highlight"},"all"!==this.props.index?l.a.createElement("div",{className:"user_info"},l.a.createElement("span",null,this.props.chat.abs_object.title)):l.a.createElement("div",{className:"autoMode"},l.a.createElement("p",{className:"auto-p"},"\u06cc\u06a9 \u0686\u062a \u0631\u0627 \u0628\u0631\u0627\u06cc \u0634\u0631\u0648\u0639 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f")))),l.a.createElement("div",{className:"msg_card_body"},"all"!==this.props.index&&l.a.createElement(l.a.Fragment,null,this.props.loading&&l.a.createElement("div",{className:"spinner"},l.a.createElement("div",{className:"spinner-item"}),l.a.createElement("div",{className:"spinner-item"}),l.a.createElement("div",{className:"spinner-item"})),l.a.createElement("ul",{className:"lives_grid"},this.props.messages.messages&&Object.keys(this.props.messages.messages).reverse().map((function(e){return"Live"===t.props.messages.messages[e].type&&l.a.createElement(_,{key:e,auth:t.props.auth,message:t.props.messages.messages[e]})})),!1===this.props.messages&&l.a.createElement("p",{className:"retry-btn msg",onClick:this.props.retry},"Error: Try refresh")),this.props.messages.old_has_continue&&l.a.createElement("p",{className:"retry-btn msg",onClick:this.props.retry},"Load again(base on last message)"))))}}]),a}(l.a.Component),f=(a(42),function(t){Object(c.a)(a,t);var e=Object(i.a)(a);function a(){var t;return Object(s.a)(this,a),(t=e.call(this)).state={msgLoading:!1,index:"all",current_chat:{abs_object:{title:"\u062e\u0627\u0646\u0647"}},chats:[],mainChats:{},messages:{},lastMsgid:0},t.chChat=t.chChat.bind(Object(u.a)(t)),t.getChats=t.getChats.bind(Object(u.a)(t)),t.getMessages=t.getMessages.bind(Object(u.a)(t)),t}return Object(n.a)(a,[{key:"menu",value:function(){v()(".contacts_card, .msg_card").toggle()}},{key:"getChats",value:function(){var t=this;!this.state.chats.length&&this.setState({chats:[]}),d.a.post("chats?auth="+this.props.auth).then((function(e){console.log(e.data),e.data?t.setState({chats:e.data.chats}):t.setState({chats:!1})})).catch((function(e){return t.setState({chats:!1})}))}},{key:"getMessages",value:function(){var t=this;this.state.messages.old_has_continue?(this.setState({msgLoading:!0,messages:[]}),d.a.post("messages?auth=".concat(this.props.auth,"&object_guid=").concat(this.state.current_chat.object_guid,"&msg_id=").concat(this.state.lastMsgid)).then((function(e){console.log(e.data),e.data?t.setState({messages:e.data,lastMsgid:e.data.old_max_id,msgLoading:!1}):t.setState({messages:!1,msgLoading:!1})})).catch((function(e){return t.setState({messages:!1,msgLoading:!1})}))):window.location.reload()}},{key:"chChat",value:function(t){"all"===t?this.setState({index:"all",current_chat:{abs_object:{title:"\u062e\u0627\u0646\u0647"}}}):this.state.chats[t]!==this.state.current_chat&&this.setState({index:t,current_chat:this.state.chats[t]})}},{key:"componentDidMount",value:function(){var t=this;v()(".msg_card").hide(),!this.state.chats.length&&d.a.post("chats?auth="+this.props.auth).then((function(e){console.log(e.data),e.data?t.setState({chats:e.data.chats,mainChats:e.data}):t.setState({chats:!1})})).catch((function(e){return t.setState({chats:!1})}))}},{key:"componentDidUpdate",value:function(t,e){var a=this;e.current_chat.object_guid!==this.state.current_chat.object_guid&&"all"!==this.state.index&&(this.setState({msgLoading:!0,messages:[]}),v()(".contacts_card, .msg_card").toggle(),d.a.post("messages?auth=".concat(this.props.auth,"&object_guid=").concat(this.state.current_chat.object_guid,"&msg_id=").concat(this.state.current_chat.last_message_id)).then((function(t){console.log(t.data),t.data?a.setState({messages:t.data,lastMsgid:t.data.old_max_id,msgLoading:!1}):a.setState({messages:!1,msgLoading:!1})})).catch((function(t){return a.setState({messages:!1,msgLoading:!1})})))}},{key:"render",value:function(){return l.a.createElement("div",{className:"chats-container"},"all"!==this.state.index&&l.a.createElement("div",{className:"menu",onClick:this.menu},l.a.createElement("div",{className:"bar1"}),l.a.createElement("div",{className:"bar2"}),l.a.createElement("div",{className:"bar3"})),l.a.createElement(E,{index:this.state.index,loading:this.state.msgLoading,chat:this.state.current_chat,chats:this.state.chats,mainchats:this.state.mainChats,messages:this.state.messages,retry:this.getMessages,auth:this.props.auth}),l.a.createElement(b,{chats:this.state.chats,retry:this.getChats,chChat:this.chChat,current_chat:this.state.current_chat}))}}]),a}(l.a.Component)),y=a(9),N=a.n(y),C=function(t){Object(c.a)(a,t);var e=Object(i.a)(a);function a(){var t;return Object(s.a)(this,a),(t=e.call(this)).state={auth:N.a.get("auth"),loading:!0},t}return Object(n.a)(a,[{key:"chAuth",value:function(t){this.setState({auth:t},(function(){N.a.set("auth",t,{secure:!0})}))}},{key:"render",value:function(){return l.a.createElement("div",{className:"app"},l.a.createElement("div",{className:"home"},this.state.auth?l.a.createElement(f,{auth:this.state.auth}):l.a.createElement(g,{chAuth:this.chAuth.bind(this)})))}}]),a}(l.a.Component);h.a.render(l.a.createElement(C,null),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.4ea76e5c.chunk.js.map