import {User} from './user';

export class Tweet {
  constructor(id: number, user: User, message: string, datePlaced: Date, likes: number, hashtags: string[]) {
    this.id = id;
    this.user = user;
    this.message = message;
    this.datePlaced = datePlaced;
    this.likes = likes;
    this.hashtags = hashtags;
  }

  id: number;
  user: User;
  message: string;
  datePlaced: Date;
  likes: number;

  hashtags: string[];
}
