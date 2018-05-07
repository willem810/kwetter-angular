export class User {
  id: number;
  username: string;
  name: string;
  location: string;
  web: string;
  bio: string;
  following: string[];
  followers: string[];
  groups: string[];
  rel: {
    tweets: string;
    tweetCount: string;
    tweet: string;
    followUser: string;
    unFollowUser: string;
    addGroup: string;
    removeGroup: string;
    feed: string;
  };
}
