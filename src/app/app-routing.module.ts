/*
 *
 * Angular Dependencies
 *
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Defines all the navigation routes used in the application
const routes: Routes = [
    {
        path: '',
        /** TODO (Jordan Turner - 2020-09-14: Replace the import statement with it's alias once ready. */
        loadChildren: () =>
            import('./match-tracker/match-tracker.module').then(m => m.MatchTrackerModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
