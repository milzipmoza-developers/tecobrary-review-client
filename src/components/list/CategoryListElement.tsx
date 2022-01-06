import {ReactElement} from "react";
import {Divider} from "@mui/material";
import styled from "styled-components";
import {Category} from "../../api/category/category.model";
import {useHistory} from "react-router-dom";

interface Props {
  category: Category,
  itemOnClick?: (id: string) => void
}

const CategoryListElement = ({category, itemOnClick}: Props): ReactElement => {

  const history = useHistory()

  const onClick = () => {
    history.push(`/books?category=${category.no}`)
  }

  return (
    <>
      <Element onClick={itemOnClick ? () => itemOnClick(category.no) : onClick}>
        <ElementImage src={category.imageUrl}/>
        <ElementContent>
          <ElementDescription>{category.description}</ElementDescription>
          <ElementName>
            {category.name}
          </ElementName>
        </ElementContent>
      </Element>
      <Divider/>
    </>
  )
}

export default CategoryListElement

const Element = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
`

const ElementImage = styled.img`
  width: 4rem;
  border-radius: 10%;
  margin-left: 1rem;
  margin-right: 2rem;
`

const ElementContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ElementDescription = styled.div`
  font-size: small;
  width: 100%;
`

const ElementName = styled.div`
  display: flex;
  font-weight: bold;
  font-size: large;
  line-height: 2rem;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: auto;
`