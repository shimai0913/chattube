import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  InputBase,
  // Divider,
  // List,
  // ListItem,
  // ListItemAvatar,
  // Avatar,
  // ListItemText,
} from "@material-ui/core";
import styled from "styled-components";
// import Lottie from "react-lottie";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

import Layout from '../../layouts/default/index'
import VideoInfo from '../organisms/videoinfo-content';
import {
  HEADER_HEIGHT,
  //  LOGO_WIDTH, LOGO_HEIGHT
} from "../../themes/index";


const SVideo = styled(Grid)`
  padding-top: 56.25%;
  width: 100%;
  background-color: #000000;
  z-index: 99;
`;

const VideoLinkList = styled(Grid)`
  width: 30%;
  z-index: 99;
`;

const CommentBox = styled(InputBase)`
  border: 2px solid #303030;
  color: #fff;
`;

const Danmaku = styled(Grid)`
  z-index: 90;
`;

const Comment = styled(Typography)`
  color: #fff;
  font-size: 40px;
  width: 100%;
  animation: flowing 7s linear 1;
  transform: translateX(100%);
  @keyframes flowing {
    100% {
      transform: translateX(-100%);
    }
  }
`;

const HomeTemplate = () => {
  const [isStopped, setIsStopped] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsStopped(false);
  }, []);

  const sendComment = (text) => {
    console.log('送信: ', text)
  }

  useEffect(() => {
    console.log('コメントが更新されました');
    // console.log(comments.length)
    if (comments.length > 0) {
      comments.map((commet, index) => {
        sendComment(commet);
      })
    }
    // console.log('finish');
  }, [comments]);

  return (
    <>
      <Layout
        topSection={(videoUrl) => {
          return (
            <>
              <SVideo
                style={{
                  // position: !pcMatches ? "sticky" : "relative",
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                }}
              >
                <Grid
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                  container
                  direction="column"
                  alignItems="flex-end"
                >
                  <Grid
                    container
                    justify="center"
                    direction="column"
                    alignItems="flex-end"
                    style={{ position: "relative", width: "unset" }}
                  >
                    <Grid
                      style={{
                        position: "absolute",
                        left: "10%",
                        right: "10%",
                        top: 0,
                        width: "80%",
                        margin: "0 auto",
                        pointerEvents: "none",
                      }}
                    >
                      {/* <Lottie
                        options={{
                          loop: false,
                          autoplay: true,
                          // animationData: animationData,
                        }}
                        isStopped={isStopped}
                        isPaused={false}
                        eventListeners={[
                          {
                            eventName: "complete",
                            callback: () => setIsStopped(true),
                          },
                        ]}
                      /> */}
                    </Grid>
                  </Grid>
                </Grid>
                <iframe
                  width="100%"
                  height="100%"
                  frameborder="0"
                  src={videoUrl} // ?autoplay=1 を追加したい
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    border: "none",
                    paddingBottom: 45,
                  }}
                  // allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  allow="autoplay; fullscreen;"
                  allowFullScreen
                />
                <Danmaku
                  container
                  direction="column"
                  alignItems="flex-end"
                  style={{
                    width: "100%",
                    // height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    // bottom: 0,
                    border: "none",
                    overflow: "hidden",
                  }}
                >
                  {comments.length >= 0 &&
                    comments.map((comment, index) => {
                      return (
                        <Comment>{comment}</Comment>
                      );
                    })
                  }
                </Danmaku>
              </SVideo>
              <Grid
                style={{
                  height: 45,
                  backgroundColor: "rgba(0,0,0,0.85)",
                  position: "relative",
                }}
                container
                direction="row"
                justify="center"
              >
                <Grid>
                  <CommentBox
                    placeholder=" こめんと "
                    onChange={(event) => {
                      console.log(event.target.value)
                      // setText(event.target.value);
                    }}
                  />
                  {/* <IconButton
                    onClick={() => {
                      search(text);
                    }}
                    size='medium'
                  >
                    <SSearchIcon />
                  </IconButton> */}
                </Grid>
              </Grid>
            </>
          );
        }}
        children={(videoUrl) => {
          return (
            <Container
              disableGutters
              maxWidth='xl'
              style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
            >
              <Grid container direction='row'>
                {/* 左側 */}
                <VideoInfo videoUrl={videoUrl} setComments={setComments}/>
                {/* 右側 次のおすすめ */}
                <VideoLinkList>次のビデオとかとか</VideoLinkList>
              </Grid>
            </Container>
          );
        }}
      >
      </Layout>
    </>
  );
}

export default HomeTemplate;
