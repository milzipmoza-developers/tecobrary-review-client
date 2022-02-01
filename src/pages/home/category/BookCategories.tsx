import {ReactElement} from "react";
import {Category} from "../../../interfaces";
import styled from "styled-components";
import "./book-categories.css";
import {BookCategoryButton} from "./BookCategoryButton";
import {useHistory} from "react-router-dom";
import {ReactComponent as More} from '../../../assets/more.svg';
import {BookCategoryButtonSkeleton} from "./BookCategoryButtonSkeleton";

interface Props {
  categories: Category[]
  loading?: boolean
}

function BookCategories({categories, loading}: Props): ReactElement {
  const history = useHistory()

  const onClick = (name: string) => () => {
    history.push(`/books?category=${name}`)
  }

  const moreCategoriesOnClick = () => {
    history.push(`/categories`)
  }

  const LoadingButtons = (): ReactElement => (
    <>
      {[1, 2, 3, 4, 5, 6].map((index: number) => (<BookCategoryButtonSkeleton key={index}/>))}
    </>
  )

  const LoadedButtons = (): ReactElement => (
    <>
      {categories.map((category: Category, index: number) => (
        <BookCategoryButton key={index} name={category.name} imgSrc={category.imageUrl}
                            onClick={onClick(category.no)}/>
      ))}
      <BookCategoryButton name='더보기' onClick={moreCategoriesOnClick}>
        <More style={{width: "2rem", height: "2rem"}}/>
      </BookCategoryButton>
    </>
  )

  return (
    <Wrapper>
      <CategoryElements className='scroll-hidden'>
        {loading
          ? <LoadingButtons/>
          : <LoadedButtons/>}
      </CategoryElements>
    </Wrapper>
  )
}

export default BookCategories

const Wrapper = styled.div`
  height: fit-content;
  width: auto;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
`

const CategoryElements = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  width: fit-content;
  padding: 1rem 1rem 1rem 1rem;
`