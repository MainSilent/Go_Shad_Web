import React from 'react'
import axios from 'axios'

class Live extends React.Component {
    constructor() {
        super ()
        this.state = {
            url: ""
        }
    }
    formatDate(timestamp) {
        const date = new Date(parseInt(timestamp)*1000)
        return `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()} ${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }
    timeConvert(n) {
        if(!n) return "N/A"
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + ":" + (rminutes<10?'0':'') + rminutes;
    }
    play(data, download) {
        if(!this.state.url) {
            axios.post(`http://localhost/getUrl?auth=${this.props.auth}&access_token=${data.access_token}&live_id=${data.live_id}`)
            .then((res) => {
                console.log(res.data)
                res.data &&
                    this.setState({
                        url: res.data.play_url
                    }, () => {
                        download ?
                        window.open(res.data.play_url) :
                        window.open("video.html?url="+res.data.play_url)
                    })
            })
            .catch(err => console.log(err))    
        } else {
            download ?
            window.open(this.state.url) :
            window.open("video.html?url="+this.state.url)
        }
    }
    render() {
        return (
        <li>
            <figure className="grid__figure">
                <img
                    src={`data:image/jpeg;base64, ${this.props.message.live_data.thumb_inline}`}
                    className={!this.props.message.live_data.live_status.can_play ? "cantplay" : ""} alt=""/>
                {!this.props.message.live_data.live_status.can_play ? 
                    <>
                        <h1>N/A</h1>
                        <div className="live_detail">
                            <p>{this.timeConvert(this.props.message.live_data.live_status.duration)}</p>
                        </div>
                    </> : 
                    <div className="live_detail">
                        <p>{this.timeConvert(this.props.message.live_data.live_status.duration)}</p>
                        <img 
                            src="assets/images/download.png"
                            onClick={() => this.play(this.props.message.live_data, true)}
                            style={this.props.message.live_data.live_status.status === "InProgress" ? {visibility: "hidden"} : {}}
                            alt="download"
                        />
                        <img src="assets/images/play.png" onClick={() => this.play(this.props.message.live_data)} alt="play"/>
                    </div>
                }
                <figcaption>
                    {this.formatDate(this.props.message.time)}
                </figcaption>
            </figure>
        </li>
        )
    }
}

export default Live