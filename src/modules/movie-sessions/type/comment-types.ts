export class CommentArrayType {
  movieId: string;
  comments: CommentInfoType[];
}

export class CommentType {
  movieId: string;
  comment: CommentInfoType;
}

export class CommentInfoType {
  id: string;
  userProfileId: string;
  userName: string;
  userEmail: string;
  createdDate: string;
  text: string;
}
