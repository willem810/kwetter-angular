import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Tweet} from '../domain/tweet';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements AfterViewChecked {

  @Input('tweets') tweets: Tweet[];

  constructor() {
  }

  ngAfterViewChecked() {
    this.sort();
  }

  sort(): void {
    if (this.tweets) {
      this.tweets.sort((a: Tweet, b: Tweet) => {
          if ((a.datePlaced < b.datePlaced)) {
            return 1;
          }

          if ((a.datePlaced > b.datePlaced)) {
            return -1;
          }

          return 0;
        }
      );
    }
  }


  private getProfilePicture(sizeX: number, sizeY: number): string {
    return 'assets/images/default.png';
  }

}
