import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() message: object;
  msg: string;
  reason: string;

  constructor() { }

  ngOnInit(): void {
    for (const key in this.message) {
      if (key === 'reason') {
        this.reason = this.message[key];
      } else if (key === 'message') {
        this.msg = this.message[key];
      }
    }
  }

}
