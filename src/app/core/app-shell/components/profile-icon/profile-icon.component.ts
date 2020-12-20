import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
