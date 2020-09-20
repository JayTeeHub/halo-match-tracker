import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTrackerComponent } from './match-tracker.component';

describe('MatchTrackerComponent', () => {
    let component: MatchTrackerComponent;
    let fixture: ComponentFixture<MatchTrackerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MatchTrackerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MatchTrackerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
