import React, {ReactElement, useEffect} from "react";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import Plain from "../../components/plain/Plain";
import {TimelineElement} from "./TimelineElement";
import {TimelineApi} from "../../api/timeline/timeline.service";
import {timelineMapper} from "../../model/timeline/mapper";
import {useRecoilState, useSetRecoilState} from "recoil";
import {timelineState} from "../../states/Timeline";
import styled from "styled-components";
import {RefreshCircle} from "react-ionicons";
import {NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";

function TimelinePage(): ReactElement {

  const size = 10;
  const [contentState, setContentState] = useRecoilState(timelineState);
  const setPop = useSetRecoilState(popState);
  let polling: NodeJS.Timeout;

  useEffect(() => {
    fetchInitialData();
    return () => {
      setContentState({
        firstContent: undefined,
        hasMore: false,
        contents: []
      });
      clearInterval(polling);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      const timelineContents = await TimelineApi.getTimeline(size);
      const firstContentNo = timelineContents[0]?.review.no;
      setContentState({
        firstContent: firstContentNo,
        hasMore: false,
        contents: timelineContents.map(it => timelineMapper(it))
      });
      initPolling(firstContentNo);
    } catch (e) {
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: `리뷰를 불러오는 도중에 문제가 발생했어요`, open: true, duration: 3000, color: "WARN"});
        return;
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        setPop({message: `리뷰를 불러오는 도중에 문제가 발생했어요`, open: true, duration: 3000, color: "WARN"});
        return;
      }
      setPop(NETWORK_ERROR_DEFAULT);
    }
  }

  const initPolling = (firstContentNo: string) => {
    polling = setInterval(async function () {
      if (contentState.firstContent) {
        try {
          const hasMore = await TimelineApi.hasMore(firstContentNo);
          if (hasMore) {
            setContentState((old) => ({
              ...old,
              hasMore: hasMore
            }));
            clearInterval(polling)
          }
        } catch (e) {
          clearInterval(polling)
        }
      }
    }, 10000);
  }
  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <Refresher onClick={async () => {
        setContentState((old) => ({
          ...old,
          hasMore: false
        }))
        await fetchInitialData()
      }} style={contentState.hasMore ? boxActive : boxHidden}>
        <RefresherTitle>
          <div style={{marginRight: "4px"}}>새로운 리뷰가 있어요</div>
          <div style={{height: "22px", width: "22px"}}>
            <RefreshCircle color={"white"}/>
          </div>
        </RefresherTitle>
      </Refresher>
      <Plain title='모든 리뷰를 모아볼 수 있어요'
             margin='0 1rem'>
        {contentState.contents.map((content, index) => {
          const {member, book, review} = content;
          return (
            <TimelineElement key={index} member={member} book={book} review={review}/>
          )
        })}
      </Plain>
    </UserPageFrame>
  );
}

export default TimelinePage;

const boxActive = {
  transition: "top 500ms",
};

const boxHidden = {
  top: "-50px",
  transition: "top 500ms",
};

const Refresher = styled.div`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: rgb(36, 100, 224);
  color: white;
  z-index: 200;
  border-radius: 20px;
`

const RefresherTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
