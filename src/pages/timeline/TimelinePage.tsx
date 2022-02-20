import React, {ReactElement, useEffect, useState} from "react";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import Plain from "../../components/plain/Plain";
import {Timeline} from "../../model/timeline";
import {TimelineElement} from "./TimelineElement";
import {TimelineApi} from "../../api/timeline/timeline.service";
import {timelineMapper} from "../../model/timeline/mapper";

function TimelinePage(): ReactElement {

  const size = 10;
  const [contents, setContents] = useState<Timeline[]>([]);

  useEffect(() => {
    fetchInitialData()
  }, []);

  const fetchInitialData = async () => {
    try {
      const timelineContents = await TimelineApi.getTimeline(size);
      setContents(timelineContents.map(it => timelineMapper(it)));
    } catch (e) {
      console.log('');
    }
  }
  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <Plain title='모든 리뷰를 모아볼 수 있어요'
             margin='0 1rem'>
        {contents.map((content, index) => {
          const {member, book, review} = content;
          return (
            <TimelineElement key={index} member={member} book={book} review={review}/>
          )
        })}
      </Plain>
    </UserPageFrame>
  );
}

export default TimelinePage
