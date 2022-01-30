export interface MemberAuth {
  issuedDate: string,
  token: string
}

export interface AuthenticatedMemberInfo {
  memberNo: string
  memberName: string
  profileImageUrl: string
}