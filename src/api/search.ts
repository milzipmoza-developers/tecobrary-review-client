import {InternalSearchBook} from "../interfaces";
import {getRandomColor} from "./home";

export const getSearchBook = (id: string): InternalSearchBook | null => {
  const foundBook = getSearchBooks.find((it: InternalSearchBook) => it.isbn === id);
  return foundBook
    ? foundBook
    : null
}

export const getSearchBooks: InternalSearchBook[] = [
  {
    isbn: "10",
    imageUrl: 'http://image.kyobobook.co.kr/images/book/xlarge/330/x9788960777330.jpg',
    title: '자바 ORM 표준 JPA 프로그래밍',
    author: '김영한',
    tags: [
      {
        name: 'JPA',
        colorCode: getRandomColor()
      },
      {
        name: '쉬움',
        colorCode: getRandomColor()
      }
    ]
  },
  {
    isbn: "17",
    imageUrl: 'http://image.kyobobook.co.kr/images/book/xlarge/602/x9788965402602.jpg',
    title: '스프링 부트와 AWS로 혼자 구현하는 웹 서비스',
    author: '이동욱',
    tags: [
      {
        name: 'IT',
        colorCode: getRandomColor()
      },
      {
        name: 'AWS',
        colorCode: getRandomColor()
      },
      {
        name: '쉬움',
        colorCode: getRandomColor()
      }
    ]
  },
]