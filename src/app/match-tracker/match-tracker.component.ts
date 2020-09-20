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
import { YouTubeIframe, YouTubeIframePlayer } from '../common/interfaces/youtube-iframe.interface';

/*
 *
 * Third-Party Dependencies
 *
 */
import * as YouTubeIframeLoader from 'youtube-iframe';

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

    /** Instance of YouTube embedded video player that defines:
     * - video to play
     * - width & height of iFrame
     * - event methods that will be trigged by actions taken on the video player (ie. start, pause,
     *   etc..)
     */
    public player: YouTubeIframePlayer;

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
    ngOnInit(): void {
        YouTubeIframeLoader.load((YT: YouTubeIframe) => {
            this.player = new YT.Player('player', {
                videoId: 'M7lc1UVf-VE',
                height: '390',
                width: '640',
                events: {
                    onReady: event => {},
                    onStateChange: event => {}
                }
            });
        });
    }
}
