import {Category} from "./category.model";
import {ListElementProps} from "../../components/ListProps";
import {CategoryImageContainer} from "../../components/CategoryImageContainer";

const mapper = (items: Category[]): ListElementProps => {
  return {
    data: items.map(item => {
      return {
        no: item.no,
        name: item.name,
        description: item.description,
        image: CategoryImageContainer(item.imageUrl)
      }
    })
  }
}

export const CategoryMapper = {
  mapper
}