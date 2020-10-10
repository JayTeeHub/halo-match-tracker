/** Angular Dependencies */
import { Component, OnInit } from '@angular/core';

/*
 *
 * Third-Party Dependencies
 *
 */

/*
 *
 * Enums
 *
 */

/** Parent component for Match Tracker. This provides a high-level, container, UI for which HCS
 * video and stats (childern) will live in. */
@Component({
    selector: 'match-tracker',
    templateUrl: './match-tracker.component.html',
    styleUrls: ['./match-tracker.component.scss']
})
export class MatchTrackerComponent implements OnInit {
    /*
     *
     * Public Members
     *
     */

    /*
     *
     * Private Members
     *
     */

    /*
     *
     * Constructor
     *
     */
    constructor() {}

    /*
     *
     * Public Functions
     *
     */

    /*
     *
     * Initalization
     *
     */
    ngOnInit(): void {}
}
