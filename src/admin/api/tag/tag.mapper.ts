import {Tag} from "./tag.model";
import {ListElementProps} from "../../components/ListProps";
import {colorCodeContainer} from "../../components/ColorCodeContainer";

const mapper = (items: Tag[]): ListElementProps => {
  return {
    data: items.map(item => {
      return {
        no: item.no,
        name: item.name,
        description: item.description,
        color: colorCodeContainer(item.colorCode)
      }
    })
  }
}

export const TagMapper = {
  mapper
}