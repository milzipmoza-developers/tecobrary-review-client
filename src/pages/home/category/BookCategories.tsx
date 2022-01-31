import {ReactElement} from "react";
import {Category} from "../../../interfaces";
import styled from "styled-components";
import "./book-categories.css";
import {BookCategoryButton} from "./BookCategoryButton";
import {useHistory} from "react-router-dom";
import {ReactComponent as More} from '../../../assets/more.svg';

interface Props {
  categories: Category[]
}

function BookCategories({categories}: Props): ReactElement {
  const history = useHistory()

  const onClick = (name: string) => () => {
    history.push(`/books?category=${name}`)
  }

  const moreCategoriesOnClick = () => {
    history.push(`/categories`)
  }

  return (
    <Wrapper>
      <CategoryElements className='scroll-hidden'>
        {categories.map((category: Category, index: number) => (
          <BookCategoryButton key={index} name={category.name} imgSrc={category.imageUrl}
                              onClick={onClick(category.no)}/>
        ))}
        <BookCategoryButton name='더보기' onClick={moreCategoriesOnClick}>
          <More style={{width: "2rem", height: "2rem"}}/>
        </BookCategoryButton>
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