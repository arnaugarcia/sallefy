import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFollowPlaylist } from 'app/shared/model/follow-playlist.model';
import { FollowPlaylistService } from './follow-playlist.service';
import { FollowPlaylistDeleteDialogComponent } from './follow-playlist-delete-dialog.component';

@Component({
  selector: 'jhi-follow-playlist',
  templateUrl: './follow-playlist.component.html'
})
export class FollowPlaylistComponent implements OnInit, OnDestroy {
  followPlaylists?: IFollowPlaylist[];
  eventSubscriber?: Subscription;

  constructor(
    protected followPlaylistService: FollowPlaylistService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.followPlaylistService.query().subscribe((res: HttpResponse<IFollowPlaylist[]>) => {
      this.followPlaylists = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFollowPlaylists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFollowPlaylist): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFollowPlaylists(): void {
    this.eventSubscriber = this.eventManager.subscribe('followPlaylistListModification', () => this.loadAll());
  }

  delete(followPlaylist: IFollowPlaylist): void {
    const modalRef = this.modalService.open(FollowPlaylistDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.followPlaylist = followPlaylist;
  }
}
