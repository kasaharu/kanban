import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { IconComponent } from '../../../../shared/presenters/icon/icon.component';

@Component({
    selector: 'app-profile-icon',
    templateUrl: './profile-icon.component.html',
    styleUrls: ['./profile-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [IconComponent, NgIf],
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
