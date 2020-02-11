import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { HttpResponse } from '@angular/common/http';
import { WidgetBase } from 'app/layouts/widgets/widget-base';
import { WidgetsService } from 'app/layouts/widgets/widgets.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sf-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit, OnDestroy, WidgetBase {
  private widgetReloaded$: Subscription = new Subscription();
  users: IUser[] = [];

  constructor(private widgetsService: WidgetsService, private userService: UserService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.loadAll();

    this.widgetReloaded$ = this.widgetsService.reloadWidget$.subscribe((widgetSelector: string) => {
      if (this.hasTheSelector(widgetSelector)) {
        this.reload();
      }
    });
  }

  ngOnDestroy(): void {
    this.widgetReloaded$.unsubscribe();
  }

  private loadAll(): void {
    this.userService.query({ notFollowing: true, size: 5 }).subscribe((response: HttpResponse<IUser[]>) => {
      this.users = response.body != null ? response.body : [];
    });
  }

  private hasTheSelector(widgetSelector: string): boolean {
    return this.elementRef.nativeElement.tagName === widgetSelector.toUpperCase();
  }

  public reload(): void {
    this.loadAll();
  }

  follow(user: IUser): void {
    this.userService.follow(user).subscribe((response: HttpResponse<{ follow: boolean }>) => {
      if (response.ok) this.reload();
    });
  }
}
