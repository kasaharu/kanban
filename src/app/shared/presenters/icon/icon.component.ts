import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IconNameType, IconSizeType } from '../helpers/icon-properties';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  constructor() {}

  // NOTE: https://material.io/resources/icons
  @Input()
  iconName: IconNameType = 'warning';
  @Input()
  lightMode = false;
  @Input()
  size: IconSizeType = 24;

  get colorClass() {
    return this.lightMode ? 'md-light' : 'md-dark';
  }

  ngOnInit(): void {}
}
