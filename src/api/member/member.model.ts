export interface MemberMyInfo {
  member: Member
}

interface Member {
  name: string
  email: string
  profileImageUrl: string
  blogUrl: string
  description: string
}