import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import axios from 'axios';

const Meta = styled(Grid)`
  width: 70%;
  z-index: 99;
`;

const Description = styled(Typography)`
  padding-left: 50px;
`;

const VideoInfo = (props) => {
  // const videoUrl = props.videoUrl;
  const { videoUrl, setComments } = props;
  const [meta, setMeta] = useState({
    'channelId': '',
    'channelTitle': '',
    'description': '',
    'publishedAt': '',
    'title': '',
    'commentCount': '',
    'dislikeCount': '',
    'likeCount': '',
    'viewCount': '',
  });
  const [subscriberCount, setSubscriberCount] = useState('');
  const [thumbnails, setThumbnails] = useState('');
  const [chatId, setChatId] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);

  const getVideoInfo = async (video_url) => {
    let video_id = video_url.replace('https://www.youtube.com/watch?v=' , '')
    let url = 'https://www.googleapis.com/youtube/v3/videos'
    let options = {
      'params' : {
        'key': process.env.REACT_APP_YOUTUBE_API_KEY,
        'id': video_id,
        'part': 'snippet,contentDetails,statistics,status'
      }
    }

    try {
      const res = await axios.get(url, options);
      let channelId = res['data']['items'][0]['snippet']['channelId'];
      getChannelInfo(channelId).then((val) => {
        setSubscriberCount(val[0])
        setThumbnails(val[1])
      });
      let channelTitle = res['data']['items'][0]['snippet']['channelTitle'];
      let description = res['data']['items'][0]['snippet']['description'];
      let publishedAt = new Date(res['data']['items'][0]['snippet']['publishedAt']);
      publishedAt = `${publishedAt.getFullYear()}/${publishedAt.getMonth()+1}/${publishedAt.getDate()}`;
      let title = res['data']['items'][0]['snippet']['title'];
      let commentCount = res['data']['items'][0]['statistics']['commentCount'];
      let dislikeCount = res['data']['items'][0]['statistics']['dislikeCount'];
      let likeCount = res['data']['items'][0]['statistics']['likeCount'];
      let viewCount = res['data']['items'][0]['statistics']['viewCount'];
      setMeta({
        'channelId': channelId,
        'channelTitle' : channelTitle,
        'description': description,
        'publishedAt': publishedAt,
        'title': title,
        'commentCount': commentCount,
        'dislikeCount': dislikeCount,
        'likeCount': likeCount,
        'viewCount': viewCount,
      });
    } catch (error) {
      console.log('!!! Exception !!!');
      console.log('Processing of getVideoInfo function failed.: ', error);
    }
  }

  const getChannelInfo = async (channel_id) => {
    let url = 'https://www.googleapis.com/youtube/v3/channels'
    let options = {
      'params': {
        'key': process.env.REACT_APP_YOUTUBE_API_KEY,
        'id': channel_id,
        'part': 'snippet,contentDetails,statistics,status'
      }
    }
    try {
      const res = await axios.get(url, options);
      let subscriberCount = res['data']['items'][0]['statistics']['subscriberCount'];
      let thumbnails = res['data']['items'][0]['snippet']['thumbnails']['default']['url'];
      return [subscriberCount, thumbnails];
    } catch (error) {
      console.log('!!! Exception !!!');
      console.log('Processing of getChannelInfo function failed.: ', error);
    }
  }

  const getChatId = async (video_url) => {
    let video_id = video_url.replace('https://www.youtube.com/watch?v=' , '')
    let url = 'https://www.googleapis.com/youtube/v3/videos'
    let options = {
      'params' : {
        'key': process.env.REACT_APP_YOUTUBE_API_KEY,
        'id': video_id,
        'part': 'liveStreamingDetails'
      }
    }

    try {
      const res = await axios.get(url, options);
      const liveStreamingDetails = res['data']['items'][0]['liveStreamingDetails'];
      if ("activeLiveChatId" in liveStreamingDetails) {
        let chat_id = liveStreamingDetails['activeLiveChatId'];
        setChatId(chat_id);
      } else {
        setChatId(null);
      }
    } catch (error) {
      console.log('!!! Exception !!!');
      console.log('Processing of getChatId function failed.: ', error);
    }
  }

  const getNextPageToken = async () => {
    let url = 'https://www.googleapis.com/youtube/v3/liveChat/messages'
    let options = {
      'params' : {
        'key': process.env.REACT_APP_YOUTUBE_API_KEY,
        'liveChatId': chatId,
        'part': 'id,snippet,authorDetails',
        'pageToken': nextPageToken,
      }
    }

    try {
      const res = await axios.get(url, options);
      let pageToken = res['data']['nextPageToken'];
      setNextPageToken(pageToken);
    } catch (error) {
      console.log('!!! Exception !!!');
      console.log('Processing of getNextPageToken function failed.: ', error);
    }
  }

  const getChat = async () => {
    let url = 'https://www.googleapis.com/youtube/v3/liveChat/messages'
    let options = {
      'params' : {
        'key': process.env.REACT_APP_YOUTUBE_API_KEY,
        'liveChatId': chatId,
        'part': 'id,snippet,authorDetails',
        'pageToken': nextPageToken,
      }
    }

    try {
      console.log('最新のコメントを検索します');
      const res = await axios.get(url, options);
      let items = res['data']['items'];
      let commentsList = [];
      if (items.length > 0 && items.length < 10) {
        // コメントを取得
        items.map((item) => {
          let displayMessage = item['snippet']['displayMessage'];
          // let publishedAt = item['snippet']['publishedAt'];
          // console.log('displayMessage: ', displayMessage);
          // console.log('publishedAt: ', publishedAt);
          commentsList.push(displayMessage);
        })
      } else if (items.length > 10){
        console.log('コメントが多すぎるので減らします');
        items.map((item, index) => {
          if (index < 10) {
            let displayMessage = item['snippet']['displayMessage'];
            commentsList.push(displayMessage);
          }
        })
      } else {
        console.log('新しいコメントはありませんでした');
      }
      setComments(commentsList);
      let pageToken = res['data']['nextPageToken'];
      setNextPageToken(pageToken);
    } catch (error) {
      console.log('!!! Exception !!!');
      console.log('Processing of getChat function failed.: ', error);
    }
  }

  useEffect(() => {
    if (videoUrl) {
      let new_url = videoUrl.replace('https://www.youtube.com/embed/', 'https://www.youtube.com/watch?v=');
      // meta取得
      getVideoInfo(new_url);
      // LIVEじゃないなら取れない = ChatIDは取れない = 以下の処理は走らない
      getChatId(new_url);
    }
  }, [videoUrl])

  // 一回目は大量のコメントを拾ってしまうので、nextPageTokenのみ取得
  useEffect(() => {
    if (chatId) {
      getNextPageToken();
    }
  }, [chatId])

  const sleep = async (ms) => {
    return new Promise(r => setTimeout(r, ms));
  }

  // nextPageTokenが取得できたら、間隔でコメントを拾っていく
  useEffect(async () => {
    if (chatId && nextPageToken) {
      await sleep(8000);
      getChat();
    }
  }, [nextPageToken])


  return (
    <Meta>
      <List>
        {/* タイトル */}
        <ListItem>
          <ListItemText primary={meta.title} secondary={`${meta.viewCount} 回視聴・${meta.publishedAt}に公開済み`} />
        </ListItem>
        <Divider variant='middle' />
        {/* 概要欄 */}
        <ListItem>
          <ListItemAvatar>
            <Avatar src={thumbnails} />
          </ListItemAvatar>
          <ListItemText primary={meta.channelTitle} secondary={`チャンネル登録者数 ${subscriberCount}人`} />
        </ListItem>
        <ListItem>
          <Description>{meta.description}</Description>
        </ListItem>
        <Divider variant='middle' />
      </List>
    </Meta>
  );
}

export default VideoInfo;
