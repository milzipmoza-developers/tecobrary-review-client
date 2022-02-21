import {Tag} from "../../interfaces";

export interface MemberMyInfo {
  member: Member;
  bookmarks: Bookmark[];
}

interface Member {
  name: string;
  email: string;
  profileImageUrl: string;
  blogUrl: string;
  description: string;
}

interface Bookmark {
  isbn: string;
  title: string;
  imageUrl: string;
  markDateTime: string;
  tags: Tag[];
}