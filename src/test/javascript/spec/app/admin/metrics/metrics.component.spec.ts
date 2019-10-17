import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { SfMetricsMonitoringComponent } from 'app/admin/metrics/metrics.component';
import { SfMetricsService } from 'app/admin/metrics/metrics.service';

describe('Component Tests', () => {
  describe('SfMetricsMonitoringComponent', () => {
    let comp: SfMetricsMonitoringComponent;
    let fixture: ComponentFixture<SfMetricsMonitoringComponent>;
    let service: SfMetricsService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [SfMetricsMonitoringComponent]
      })
        .overrideTemplate(SfMetricsMonitoringComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SfMetricsMonitoringComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SfMetricsService);
    });

    describe('refresh', () => {
      it('should call refresh on init', () => {
        // GIVEN
        const response = {
          timers: {
            service: 'test',
            unrelatedKey: 'test'
          },
          gauges: {
            'jcache.statistics': {
              value: 2
            },
            unrelatedKey: 'test'
          }
        };
        spyOn(service, 'getMetrics').and.returnValue(of(response));

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(service.getMetrics).toHaveBeenCalled();
      });
    });
  });
});
