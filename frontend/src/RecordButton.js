import React, { Fragment, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";

const StyledFab = styled(Fab)`
  position: relative;
  background-color: ${props => (props.recording ? "#272727" : "#ff3466")};
  color: white;
  opacity: 1;
  margin: 12px;
  transition: all 0.2s;
  .pulse-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ff3466;
    border-radius: 100%;
    opacity: 0.5;
    z-index: -10;
    animation: pulse 1s ease-out infinite;
  }
  :hover {
    background-color: ${props => (props.recording ? "#272727" : "#ff3466")};
    opacity: 0.9;
  }
  @keyframes pulse {
    0% {
      transform: scale(1, 1);
    }
    50% {
      opacity: 0.3;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;

export default function RecordButton(props) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <Fragment>
      {isRecording ? (
        <Tooltip title="Stop Recording" aria-label="record" placement="right">
          <StyledFab
            onClick={() => {
              setIsRecording(false);
              props.onClick();
            }}
            color="secondary"
            aria-label="record"
          >
            <div className="pulse-bg" />
            <StopIcon />
          </StyledFab>
        </Tooltip>
      ) : (
        <Tooltip title="Start Recording" aria-label="record" placement="right">
          <StyledFab
            recording
            onClick={() => {
              setIsRecording(true);
              props.onClick();
            }}
            color="secondary"
            aria-label="record"
          >
            <MicIcon />
          </StyledFab>
        </Tooltip>
      )}
    </Fragment>
  );
}
