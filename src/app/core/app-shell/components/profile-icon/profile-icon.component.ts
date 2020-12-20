import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileIconComponent {
  @Output()
  logoutButtonEmitter = new EventEmitter();

  showBalloon = false;

  clickProfileIcon(): void {
    this.showBalloon = !this.showBalloon;
  }

  clickLogoutButton(): void {
    this.logoutButtonEmitter.emit();
  }
}
