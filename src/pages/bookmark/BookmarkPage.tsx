import React, {ReactElement, useEffect, useState} from "react";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../../states/User";
import {useHistory} from "react-router-dom";
import Plain from "../../components/plain/Plain";
import {BookmarkApi} from "../../api/mark/bookmark.service";
import {BookmarkElement} from "../../components/list/BookmarkElement";
import {SyncLoader} from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import {Bookmark} from "../../api/member/member.model";
import styled from "styled-components";
import {NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";

function BookmarkPage(): ReactElement {

  const size = 10;

  const history = useHistory();

  const user = useRecoilValue(userState);
  const setPop = useSetRecoilState(popState);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLast, setIsLast] = useState(true);
  const [lastItemMarkDateTime, setLastItemMarkDateTime] = useState<string | null>(null);

  useEffect(() => {
    if (!user.loggedIn) {
      history.push("/");
      return;
    }
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const bookmarks = await BookmarkApi.getRecents(size, null);
      setBookmarks(bookmarks);

      const _lastItemMarkDateTime = bookmarks[bookmarks.length - 1].markDateTime;
      setLastItemMarkDateTime(_lastItemMarkDateTime);
      setIsLast(size > bookmarks.length);
    } catch (e) {
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: `북마크를 불러오는 도중에 문제가 발생했어요`, open: true, duration: 3000, color: "WARN"});
        return;
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        setPop({message: `북마크를 불러오는 도중에 문제가 발생했어요`, open: true, duration: 3000, color: "WARN"});
        return;
      }

      setPop(NETWORK_ERROR_DEFAULT);
    }
  };


  const loadMore = async () => {
    try {
      const _bookmarks = await BookmarkApi.getRecents(size, lastItemMarkDateTime);
      if (_bookmarks.length == 0) {
        setIsLast(true);
        return;
      }
      setBookmarks(bookmarks.concat(_bookmarks))
      const _lastItemMarkDateTime = _bookmarks[_bookmarks.length - 1].markDateTime;
      setLastItemMarkDateTime(_lastItemMarkDateTime);
      setIsLast(size > _bookmarks.length);
    } catch (e) {
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: `북마크를 불러오는 도중에 문제가 발생했어요`, open: true, duration: 3000, color: "WARN"});
        return;
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        setPop({message: `북마크를 불러오는 도중에 문제가 발생했어요`, open: true, duration: 3000, color: "WARN"});
        return;
      }

      setPop(NETWORK_ERROR_DEFAULT);
    }
  };

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <Plain title="북마크 목록을 확인해보세요"
             margin='0 1rem'>
        <InfiniteScroll
          dataLength={bookmarks.length}
          next={loadMore}
          hasMore={!isLast}
          loader={
            <LoaderWrapper>
              <SyncLoader color={"rgb(39, 54, 60)"} margin={4} size={8}/>
            </LoaderWrapper>
          }>
          {bookmarks.map((it, index) => {
            return (
              <TimelineElementWrapper
                key={index}>
                <TimelineBookElement>
                  <BookmarkElement
                    isbn={it.isbn}
                    title={it.title}
                    imageUrl={it.imageUrl}
                    tags={it.tags}
                    markDateTime={it.markDateTime}
                  />
                </TimelineBookElement>
              </TimelineElementWrapper>
            )
          })}
        </InfiniteScroll>

      </Plain>
    </UserPageFrame>
  )
}

export default BookmarkPage;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 2rem;
`

const TimelineElementWrapper = styled.div`
  margin: 1rem 0;
`

const TimelineBookElement = styled.div`
  background: white;
  border-radius: 1rem;
  width: auto;
  height: fit-content;
  padding: 1rem;
`