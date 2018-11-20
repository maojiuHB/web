import { Component } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'vn-menu',
  template: `
    <mat-nav-list vnAccordion class="navigation">
      <mat-list-item vnAccordionLink *ngFor="let menuitem of menuService.getAll()" group="{{menuitem.state}}">
      <ng-container *ngIf="menuitem.type === 'link'">
        <a vnAccordionToggle class="relative" [routerLink]="menuitem.state" *vnHasAnyAuthority="menuitem.auth">
          <mat-icon>{{ menuitem.icon }}</mat-icon>
          <span>{{ menuitem.name }}</span>
          <span fxFlex></span>
          <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
        </a>
        </ng-container>
        <ng-container *ngIf="menuitem.type === 'extLink'">
        <a vnAccordionToggle class="relative" href="{{menuitem.state}}" *vnHasAnyAuthority="menuitem.auth">
          <mat-icon>{{ menuitem.icon }}</mat-icon>
          <span>{{ menuitem.name }}</span>
          <span fxFlex></span>
          <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
        </a>
        </ng-container>
        <ng-container *ngIf="menuitem.type === 'extTabLink'">
        <a vnAccordionToggle class="relative" href="{{menuitem.state}}" target="_blank" *vnHasAnyAuthority="menuitem.auth">
          <mat-icon>{{ menuitem.icon }}</mat-icon>
          <span>{{ menuitem.name }}</span>
          <span fxFlex></span>
          <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
        </a>
        </ng-container>
        <ng-container *ngIf="menuitem.type === 'sub'">
        <a vnAccordionToggle class="relative" href="javascript:;" *vnHasAnyAuthority="menuitem.auth">
          <mat-icon>{{ menuitem.icon }}</mat-icon>
          <span>{{ menuitem.name }}</span>
          <span fxFlex></span>
          <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
          <mat-icon class="menu-caret">arrow_drop_down</mat-icon>
        </a>
        </ng-container>
        <mat-nav-list class="sub-menu" *ngIf="menuitem.type === 'sub'">
          <mat-list-item *ngFor="let childitem of menuitem.children" routerLinkActive="open">
            <a [routerLink]="childitem.state" class="relative">{{ childitem.name }}</a>
          </mat-list-item>
        </mat-nav-list>
      </mat-list-item>
    </mat-nav-list>`,
  providers: [MenuService]
})
export class MenuComponent {
  constructor(
    public menuService: MenuService,
  ) { }

  addMenuItem(): void {
    this.menuService.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        { state: 'menu', name: 'MENU' },
        { state: 'timeline', name: 'MENU' }
      ]
    });
  }
}
