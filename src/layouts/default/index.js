import React, { useState } from "react";
import {
  // Button, Container,
  Grid, IconButton, InputBase } from "@material-ui/core";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
   HEADER_HEIGHT,
    // LOGO_WIDTH, LOGO_HEIGHT
  } from "../../themes/index";


const Header = styled(Grid)`
  height: ${HEADER_HEIGHT}px;
  background-color: rgba(0,0,0,0.85);
`;

const SMenuIcon = styled(MenuIcon)`
  ${({ theme }) => `
    color: white;
 `}
`;

const SSearchIcon = styled(SearchIcon)`
  ${({ theme }) => `
    color: white;
 `}
`;

const Search = styled(Grid)`
  position: 'relative';
  marginLeft: 0;
  width: '100%';
  color: #fff;
`;
const SearchBox = styled(InputBase)`
  border: 2px solid #303030;
  color: #fff;
`;

const Layout = ({ topSection, children }) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const search = (url) => {
    let iframe_url = url.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/');
    setVideoUrl(iframe_url);
  }

  return (
    <Grid>
      <Header
        container
        direction='row'
        alignItems='center'
        justify='space-between'
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >
        <IconButton
          onClick={() => {
            setToggle(true);
          }}
          size='medium'
        >
          <SMenuIcon />
        </IconButton>
        <Search>
          <SearchBox
            placeholder=" 検索 "
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              search(text);
            }}
            size='medium'
          >
            <SSearchIcon />
          </IconButton>
        </Search>
        <IconButton
          onClick={() => {
          }}
          size='medium'
        >
          <SMenuIcon />
        </IconButton>
      </Header>
      {topSection(videoUrl)}
      {children(videoUrl)}
    </Grid>
  );
};


export default Layout;
