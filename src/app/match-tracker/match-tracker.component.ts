/*
 *
 * Angular Dependencies
 *
 */
import { Component, OnInit } from '@angular/core';

/*
 *
 * Dependencies
 *
 */
import { YouTubeIframePlayer } from '../common/interfaces/youtube-iframe.interface';
import { SysYouTubeIframeApi } from '../common/sys/sys-youtube-iframe-api';

/*
 *
 * Third-Party Dependencies
 *
 */

/** Parent component for Match Tracker. This provides a high-level, container, UI for which HCS
 * video and stats (Childern) will live in. */
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

    /** Access the YouTube iframe API to load the HCS match YouTube video. */
    private sysYouTubeIframeApi: SysYouTubeIframeApi;

    /*
     *
     * Constructor
     *
     */
    constructor() {}

    /*
     *
     * Initalization
     *
     */
    ngOnInit(): void {}
}
