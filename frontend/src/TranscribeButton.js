import React, { Fragment, useState } from "react";

import TranslateIcon from '@mui/icons-material/Translate';
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import axios from "axios";


const StyledFab = styled(Fab)`
  position: relative;
  background-color: #272727;
  color: white;
  opacity: 1;
  margin: 12px;
  transition: all 0.2s;
  :hover {
    background-color: #272727;
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

export default function DownloadButton(props) {

  const onDownload = async () => {
    console.log(props);
    let filename = `recording.wav`;
    let blob = await fetch(props.audioSrc).then(r => r.blob());
    console.log(blob)
    let formData = new FormData();
    formData.append('audio', blob, filename);
    // the image field name should be similar to your api endpoint field name
    // in my case here the field name is customFile

    axios.post(
        'http://localhost:8080/transcribe',
        formData,
        {
            headers: {
                "Content-type": "multipart/form-data",
            },                    
        }
    )
    .then(res => {
        console.log(`Success` + res.data);
        props.setTranscrption(res.data)
    })
    .catch(err => {
        console.log(`Error` + err.data);
    })
  };

  // const onDownload = () => {
  //   console.log(audioExtension);
  //   let filename = `download.${audioExtension}`;
  //   const downloadResult = audioURL;
  //   const blob = downloadResult.blob();
  //   saveAs(blob, filename);
  // };

  return (
    <Fragment>
      <Tooltip
        title="Transcribe Recording"
        aria-label="transcribe"
        placement="right"
      >
        <StyledFab
          onClick={() => {
            onDownload();
          }}
          color="secondary"
          aria-label="transcribe"
        >
          <TranslateIcon />
        </StyledFab>
      </Tooltip>
    </Fragment>
  );
}
