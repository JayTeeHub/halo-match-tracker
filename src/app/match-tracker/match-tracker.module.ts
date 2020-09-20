/*
 *
 * Angular Dependencies
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*
 *
 * Halo Match Tracker Dependencies
 *
 */
import { MatchTrackerRoutingModule } from './match-tracker-routing.module';
import { MatchTrackerComponent } from './match-tracker.component';

/** All feature dependencies needed by Match Tracker are declared here. */
@NgModule({
    declarations: [MatchTrackerComponent],
    imports: [CommonModule, MatchTrackerRoutingModule]
})
export class MatchTrackerModule {}
