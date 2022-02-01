import {ReactElement, useEffect, useState} from "react";
import {UserPageFrame} from "../components/page/UserPageFrame";
import {PageContent} from "../components/page/PageContent";
import Plain from "../components/plain/Plain";
import Card from "../components/card/Card";
import {CategoryApi} from "../api/category/category.service";
import {PageData} from "../admin/api/interfaces";
import {Category} from "../api/category/category.model";
import {Divider} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoryListElement from "../components/list/CategoryListElement";
import {useSetRecoilState} from "recoil";
import {NETWORK_ERROR_DEFAULT, popState} from "../states/Pop";
import {RequestAction, requestTemplate} from "../api";

function CategoriesPage(): ReactElement {

  const size = 10
  const [page, setPage] = useState<number>(0)
  const [pageData, setPageData] = useState<PageData<Category>>({
    total: 0,
    size: 0,
    isFirst: true,
    isLast: true,
    items: []
  })

  const setPop = useSetRecoilState(popState)

  useEffect(() => {
    initPageData();
  }, [])

  const initPageData = async () => await requestTemplate(pageRequest)

  const pageRequest: RequestAction = {
    doOnSuccess: async () => {
      const pageData = await CategoryApi.get({page, size})
      setPageData({...pageData})
      setPage(page + 1)
    },
    doOn400Errors: (e) => {
      setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
    },
    doErrors: (e) => {
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const loadMore = async () => await requestTemplate(loadMorePageRequest)

  const loadMorePageRequest: RequestAction = {
    doOnSuccess: async () => {
      const newPageData = await CategoryApi.get({page, size})
      setPageData({
        ...newPageData,
        items: pageData.items.concat(newPageData.items)
      })
      setPage(page + 1)
    },
    doOn400Errors: (e) => {
      setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
    },
    doErrors: (e) => {
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <PageContent style={{margin: '3rem 1rem 0rem 1rem'}}>
        <Plain title='어떤 카테고리의 도서를 살펴볼까요'>
          <Card backgroundColor='white'
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            <Divider/>
            <InfiniteScroll
              dataLength={pageData.items.length} //This is important field to render the next data
              next={loadMore}
              hasMore={!pageData.isLast}
              loader={<h4>Loading...</h4>}>
              {pageData.items.map((item, index) => (
                <CategoryListElement category={item} key={index}/>
              ))}
            </InfiniteScroll>
          </Card>
        </Plain>
      </PageContent>
    </UserPageFrame>
  )
}

export default CategoriesPage
