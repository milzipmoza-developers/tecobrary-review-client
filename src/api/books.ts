import {ListBook} from "../interfaces";
import {getRandomColor} from "./home";

export const getBooks: ListBook[] = [
  {
    isbn: "2",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/670/x9788966262670.jpg",
    title: "실전 리액트 프로그래밍 리액트 훅부터 Next.js까지 개정판",
    author: "이재승",
    tags: [
      {
        name: 'IT',
        colorCode: getRandomColor()
      },
      {
        name: '입문서',
        colorCode: getRandomColor()
      },
      {
        name: 'React',
        colorCode: getRandomColor()
      },
      {
        name: 'javascript',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 1,
      like: 2,
      bookMarked: 10
    }
  },
  {
    isbn: "1",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/727/x9788960883727.jpg",
    title: "오늘도 개발자가 안 된다고 말했다",
    author: "김중철, 김수지",
    tags: [
      {
        name: 'IT',
        colorCode: getRandomColor()
      },
      {
        name: '쉬움',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 7,
      like: 100,
      bookMarked: 1000
    }
  },
  {
    isbn: "2",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/766/x9788998139766.jpg",
    title: "객체지향의 사실과 오해",
    author: "조영호",
    tags: [
      {
        name: '객체지향',
        colorCode: getRandomColor()
      },
      {
        name: '기본서',
        colorCode: getRandomColor()
      },
      {
        name: '쉬움',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 1000,
      like: 7,
      bookMarked: 9
    }
  },
  {
    isbn: "2",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/670/x9788966262670.jpg",
    title: "실전 리액트 프로그래밍 리액트 훅부터 Next.js까지 개정판",
    author: "이재승",
    tags: [
      {
        name: 'IT',
        colorCode: getRandomColor()
      },
      {
        name: '입문서',
        colorCode: getRandomColor()
      },
      {
        name: 'React',
        colorCode: getRandomColor()
      },
      {
        name: 'javascript',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 1,
      like: 2,
      bookMarked: 10
    }
  },
  {
    isbn: "1",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/727/x9788960883727.jpg",
    title: "오늘도 개발자가 안 된다고 말했다",
    author: "김중철, 김수지",
    tags: [
      {
        name: 'IT',
        colorCode: getRandomColor()
      },
      {
        name: '쉬움',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 7,
      like: 100,
      bookMarked: 1000
    }
  },
  {
    isbn: "2",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/766/x9788998139766.jpg",
    title: "객체지향의 사실과 오해",
    author: "조영호",
    tags: [
      {
        name: '객체지향',
        colorCode: getRandomColor()
      },
      {
        name: '기본서',
        colorCode: getRandomColor()
      },
      {
        name: '쉬움',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 1000,
      like: 7,
      bookMarked: 9
    }
  },
  {
    isbn: "2",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/670/x9788966262670.jpg",
    title: "실전 리액트 프로그래밍 리액트 훅부터 Next.js까지 개정판",
    author: "이재승",
    tags: [
      {
        name: 'IT',
        colorCode: getRandomColor()
      },
      {
        name: '입문서',
        colorCode: getRandomColor()
      },
      {
        name: 'React',
        colorCode: getRandomColor()
      },
      {
        name: 'javascript',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 1,
      like: 2,
      bookMarked: 10
    }
  },
  {
    isbn: "1",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/727/x9788960883727.jpg",
    title: "오늘도 개발자가 안 된다고 말했다",
    author: "김중철, 김수지",
    tags: [
      {
        name: 'IT',
        colorCode: getRandomColor()
      },
      {
        name: '쉬움',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 7,
      like: 100,
      bookMarked: 1000
    }
  },
  {
    isbn: "2",
    imageUrl: "http://image.kyobobook.co.kr/images/book/xlarge/766/x9788998139766.jpg",
    title: "객체지향의 사실과 오해",
    author: "조영호",
    tags: [
      {
        name: '객체지향',
        colorCode: getRandomColor()
      },
      {
        name: '기본서',
        colorCode: getRandomColor()
      },
      {
        name: '쉬움',
        colorCode: getRandomColor()
      }
    ],
    countDetail: {
      review: 1000,
      like: 7,
      bookMarked: 9
    }
  },
]