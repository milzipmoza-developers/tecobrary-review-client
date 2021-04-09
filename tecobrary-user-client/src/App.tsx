import React, {ReactElement} from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Navigation from "./components/navigation/Navigation";
import {Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import MyPage from "./pages/MyPage";
import BookPage from "./pages/BookPage";
import NotFoundPage from "./pages/NotFoundPage";

const Background = styled.div`
  width: 100vw;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  background-color: #ccc;
  overflow: hidden;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
  max-width: 36rem;
`;

function App(): ReactElement {
  return (
    <Background className="background">
      <Wrapper>
        <Header/>
        <Switch>
          <Route exact path={"/"} component={HomePage}/>
          <Route exact path={"/timeline"} component={TimelinePage}/>
          <Route exact path={"/my-page"} component={MyPage}/>
          <Route exact path={"/books/:id"} component={BookPage}/>
          <Route component={NotFoundPage} />
        </Switch>
        <Navigation/>
      </Wrapper>
    </Background>
  );
}

export default App;