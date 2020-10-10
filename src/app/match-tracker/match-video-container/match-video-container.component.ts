/** Angular Dependencies */
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

/** Dependencies */
import { SysYouTubeIframeApi, ApiConfig } from '../../common/sys/sys-youtube-iframe-api';

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

/** Child component to MatchTracker. Provides a UI for the YouTube iframe player along with event
 * handlers for the YouTube iframe that will help coordinate HCS match events to the rest of the app. */
@Component({
    selector: 'match-video-container',
    templateUrl: './match-video-container.component.html',
    styleUrls: ['./match-video-container.component.scss']
})
export class MatchVideoContainerComponent implements OnInit {
    /*
     *
     * Public Members
     *
     */

    /** Used in the UI to enable/disable debug controls. Enabled when set to true. */
    public isDevMode: boolean;

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

    /** Used in the UI for when the user wants to set a new time for the HCS match. This function is
     * only accessible in when the app is in development mode. */
    public onKeyDownSetTime = (event: any): void => {
        if (event.key === 'Enter') {
            const newVideoTime: number = this.getNewVideoTime(event);

            if (isNaN(newVideoTime)) {
                console.error('a valid time was not given, the HCS match will reset.');
            } else {
                // Set the new time of the HCS match
                this.sysYouTubeIframeApi.player.seekTo(newVideoTime, true);
            }
        }
    };

    /*
     *
     * Private Functions
     *
     */

    /** Helper function used to retrieve the new time for the HCS video in the format expected by
     * the Youtube iframe API. */
    private getNewVideoTime = (event: any): number => {
        // Convert the input value found in the event into number and convert to seconds
        return parseFloat(event.target.value) * 60;
    };

    ngOnInit(): void {
        this.isDevMode = !environment.production;

        this.sysYouTubeIframeApi
            .loadApi$()
            .subscribe(() => this.sysYouTubeIframeApi.loadVideo(this.hcsYoutubeId));
    }
}
