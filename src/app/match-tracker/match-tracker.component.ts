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
import { SysYouTubeIframeApi, ApiConfig } from '../common/sys/sys-youtube-iframe-api';

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

/** Configuration for the YouTube player we want to use to load/play the HCS match. */
export enum VideoPlayerConfig {
    /** HTML id reference used in the UI and used by the YouTube iframe API to load our HCS match
     * video into the UI. */
    iframeId = 'player',
    /** Height, in pixels, that the iframe will be in the UI. */
    Height = '390',
    /** Width, in pixels, that the iframe will be in the UI. */
    Width = '640'
}

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

    /** Access the YouTube iframe API to load the HCS match YouTube video. */
    private sysYouTubeIframeApi: SysYouTubeIframeApi;

    /** The HCS YouTube video that will be loaded */
    private readonly hcsYoutubeId: string = 'LTrln517t-8';

    /** Used to establish the system youtube iframe api. */
    private readonly iframeApiConfig: ApiConfig = {
        iframeId: VideoPlayerConfig.iframeId,
        height: VideoPlayerConfig.Height,
        width: VideoPlayerConfig.Width,
        onReadyEvent: null,
        onStateChangeEvent: null
    };

    /*
     *
     * Constructor
     *
     */
    constructor() {
        // Add in the event handler references to the config
        this.iframeApiConfig.onReadyEvent = this.onYouTubePlayerReady;
        this.iframeApiConfig.onStateChangeEvent = this.onYouTubeStateChange;

        this.sysYouTubeIframeApi = new SysYouTubeIframeApi(this.iframeApiConfig);
    }

    /*
     *
     * Public Functions
     *
     */

    /** Called by the YouTube iframe API when the YouTube video player has successfully loaded */
    public onYouTubePlayerReady = (event: any): void => {
        /** TODO (Jordan Turner - 2020-09-28: Build interface for ready event */
        /** TODO (Jordan Turner - 2020-09-28: Figure out if there is anything else we want to do here. */
        console.log('ready event: %o', event);
    };

    /** Called by the YouTube iframe API when the state of theYouTube video player change (ie.
     * paused, paly, etc..). */
    public onYouTubeStateChange = (event: any): void => {
        /** TODO (Jordan Turner - 2020-09-28: Build interface for state change event */
        /** TODO (Jordan Turner - 2020-09-28: Pause the RxJS timer if a pause state is passed in. */
        console.log('state change event: %o', event);
    };

    /*
     *
     * Initalization
     *
     */
    ngOnInit(): void {
        this.sysYouTubeIframeApi
            .loadApi$()
            .subscribe(() => this.sysYouTubeIframeApi.loadVideo(this.hcsYoutubeId));
    }
}
