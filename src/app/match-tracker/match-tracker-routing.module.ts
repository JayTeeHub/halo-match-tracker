/*
 *
 * Angular Dependencies
 *
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
 *
 * Halo Match Tracker Dependencies
 *
 */
import { MatchTrackerComponent } from './match-tracker.component';

/*
 *
 * Consts
 *
 */

// Holds all routes used on the match tracker feature and allows for lazy loading.
const routes: Routes = [
    {
        path: '',
        component: MatchTrackerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MatchTrackerRoutingModule {}
