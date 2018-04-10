

export class TweetRequest {
  id: number;
  user: string;
  message: string;
  datePlaced: Date;
  likes: number;

  hashtags: string[];
}
