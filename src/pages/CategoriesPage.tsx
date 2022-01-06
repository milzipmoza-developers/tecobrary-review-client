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

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchCategories = async () => {
    try {
      const pageData = await CategoryApi.get({page, size})
      setPageData({...pageData})
      setPage(page + 1)
    } catch (e) {
      // todo: error handle
    }
  }

  const fetchMoreCategories = async () => {
    try {
      const newPageData = await CategoryApi.get({page, size})
      setPageData({
        ...newPageData,
        items: pageData.items.concat(newPageData.items)
      })
      setPage(page + 1)
    } catch (e) {
      // todo: error handle
    }
  }

  return (
    <UserPageFrame top='4rem' header={true}>
      <PageContent style={{margin: '3rem 1rem 0rem 1rem'}}>
        <Plain title='어떤 카테고리의 도서를 살펴볼까요'>
          <Card backgroundColor='white'
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            <Divider/>
            <InfiniteScroll
              dataLength={pageData.items.length} //This is important field to render the next data
              next={fetchMoreCategories}
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
