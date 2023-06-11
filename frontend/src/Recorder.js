import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser";
import RecordButton from "./RecordButton.js";
import TranscribeButton from "./TranscribeButton.js";


export default class Recorder extends Component {
  constructor(props) {
    super(props);
    this.showTranscription = this.showTranscription.bind(this);
    this.state = {
      status: "",
      transcription: ""
    };
  }

  controlAudio(status) {
    this.setState({
      status
    });
  }

  showTranscription(transcription) {
    console.log("touch me " + transcription)
    this.setState({
        transcription
    });
  }

  
  toggleRecording() {
    this.state.status === "recording"
      ? this.controlAudio("inactive")
      : this.controlAudio("recording");
  }

  changeScheme(e) {
    this.setState({
      audioType: e.target.value
    });
  }

  componentDidMount() {
    this.setState({
      audioType: "audio/wav"
    });
  }

  render() {
    const { status, audioSrc, audioType } = this.state;
    const audioProps = {
      audioType,
      // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
      status,
      audioSrc,
      timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
      startCallback: e => {
        console.log("succ start", e);
      },
      pauseCallback: e => {
        console.log("succ pause", e);
      },
      stopCallback: e => {
        this.setState({
          audioSrc: window.URL.createObjectURL(e)
        });
        console.log("succ stop", e);
      },
      onRecordCallback: e => {
        console.log("recording", e);
      },
      errorCallback: err => {
        console.log("error", err);
      }
    };
    return (
      <div>
        <AudioAnalyser {...audioProps}>
          <div className="btn-box">
            <RecordButton
              id="recordButton"
              onClick={() => {
                this.toggleRecording();
              }}
            />
            
            <TranscribeButton id="transcribeButton"
                audioType={audioProps.audioType}
                audioSrc={audioProps.audioSrc}
                setTranscrption={this.showTranscription}
            />

          </div>
        </AudioAnalyser>
        { this.state.transcription }
      </div>
    );
  }
}
