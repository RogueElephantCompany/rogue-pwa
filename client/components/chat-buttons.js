import React, { Component } from 'react'

const ChatButtons = (props) => {

  return (
    <div className="mute-btn-container">
      <button
        type="submit"
        className={props.myVideoOn ? "unMute-btn" : "mute-btn"}
        onClick={props.toggleMyVideo}
      >
        <img className="chat-icon" src={props.myVideoOn ? "/images/video-on.png" : "/images/video-off.png"}
          alt="video" />
      </button>
      <button
        type="submit"
        className={props.myAudioOn ? "unMute-btn" : "mute-btn"}
        onClick={props.toggleMyAudio}
        alt="mute"
      >
        <img className="chat-icon" src={props.myAudioOn ? "/images/mic-on.png" : "/images/mic-off.png"}
          alt="mic"
        />
      </button>
      <button
        type="submit"
        className="unMute-btn"
        onClick={props.toggleAllAudio}
      >
        <img className="chat-icon" src={props.allAudioOn ? "/images/audio-on.png" : "/images/no-audio.png"}
          alt="audio"
        />
      </button>
    </div>
  )
}

export default ChatButtons

