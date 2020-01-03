import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Health, HealthDetails, HealthKey, HealthService, HealthStatus } from './health.service';
import { SfHealthModalComponent } from './health-modal.component';

@Component({
  selector: 'sf-health',
  templateUrl: './health.component.html'
})
export class SfHealthComponent implements OnInit {
  health?: Health;

  constructor(private modalService: NgbModal, private healthService: HealthService) {}

  ngOnInit(): void {
    this.refresh();
  }

  getBadgeClass(statusState: HealthStatus): string {
    if (statusState === 'UP') {
      return 'badge-success';
    } else {
      return 'badge-danger';
    }
  }

  refresh(): void {
    this.healthService.checkHealth().subscribe(
      health => (this.health = health),
      (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.health = error.error;
        }
      }
    );
  }

  showHealth(health: { key: HealthKey; value: HealthDetails }): void {
    const modalRef = this.modalService.open(SfHealthModalComponent);
    modalRef.componentInstance.health = health;
  }
}
