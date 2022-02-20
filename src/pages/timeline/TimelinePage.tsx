import React, {ReactElement, useEffect, useState} from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
import {SyncLoader} from "react-spinners";

function TimelinePage(): ReactElement {

  const size = 5;
  let polling: NodeJS.Timeout;

  const [contentState, setContentState] = useRecoilState(timelineState);
  const setPop = useSetRecoilState(popState);

  const [isLast, setIsLast] = useState(true);

  useEffect(() => {
    fetchInitialData();
    return () => {
      setContentState({
        firstReviewNo: undefined,
        hasMore: false,
        contents: []
      });
      clearInterval(polling);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      const timelineContents = await TimelineApi.getTimeline(size);
      const firstReviewNo = timelineContents[0]?.review.no;
      const lastReviewNo = timelineContents[timelineContents.length - 1].review.no;
      setContentState({
        firstReviewNo: firstReviewNo,
        lastReviewNo: lastReviewNo,
        hasMore: false,
        contents: timelineContents.map(it => timelineMapper(it))
      });
      setIsLast(size > timelineContents.length);
      initPolling(firstReviewNo);
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
  };

  const initPolling = (firstContentNo: string) => {
    polling = setInterval(async function () {
      if (firstContentNo) {
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
  };

  const loadMore = async () => {
    try {
      const timelineContents = await TimelineApi.getTimeline(size, contentState.lastReviewNo);
      if (timelineContents.length == 0) {
        setIsLast(true);
        return;
      }
      const firstContentNo = timelineContents[0]?.review.no;
      const lastReviewNo = timelineContents[timelineContents.length - 1].review.no;
      setContentState((old) => ({
        firstReviewNo: firstContentNo,
        lastReviewNo: lastReviewNo,
        hasMore: false,
        contents: old.contents.concat(timelineContents.map(it => timelineMapper(it)))
      }));
      setIsLast(size > timelineContents.length);
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
  };

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
        <InfiniteScroll
          dataLength={contentState.contents.length}
          next={loadMore}
          hasMore={!isLast}
          loader={
            <LoaderWrapper>
              <SyncLoader color={"rgb(39, 54, 60)"} margin={4} size={8}/>
            </LoaderWrapper>
          }>
          {contentState.contents.map((content, index) => {
            const {member, book, review} = content;
            return (
              <TimelineElement key={index} member={member} book={book} review={review}/>
            )
          })}
        </InfiniteScroll>
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

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 2rem;
`
