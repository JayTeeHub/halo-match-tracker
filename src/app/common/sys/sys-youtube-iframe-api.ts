/** Dependencies */
import { YouTubeIframe, YouTubeIframePlayer } from '../interfaces/youtube-iframe.interface';

/** Third-Party Dependencies */
import { Observable, Subscriber } from 'rxjs';

/*
 *
 * Interfaces
 *
 */

/** Configuration paramters passed into the Class constructor and used to establish the YouTube
 * iframe API */
export interface ApiConfig {
    /** HTML markup id of where in the DOM the YouTube iframe palyer will be loaded */
    iframeId: string;
    /** Width of the YouTube palyer */
    width: string;
    /** Height of the YouTube player */
    height: string;
    /** Event handler called by the YouTube player once the player is ready. */
    onReadyEvent: Function;
    /** Event handler called by the YouTube player when the state of the video changes (ie.
     * PAUSED, PLAYING, ENDED, etc...). */
    onStateChangeEvent: Function;
}

/** System level service that is used to load and mointor a YouTube player in the API throught the
 * YouTube iframe API. */
export class SysYouTubeIframeApi {
    /*
     *
     * Public Members
     *
     */

    /** Instance of YouTube video player, used to control/mointor the video player. */
    public player: YouTubeIframePlayer;

    /*
     *
     * Private Members
     *
     */

    /** YouTube API link reference */
    private readonly apiSource = 'https://www.youtube.com/iframe_api';

    /** Holds config passed into constructor */
    private config: ApiConfig;

    /** Holds the YouTube iFrame API instance after it has been loaded. */
    private youTubeIframe: YouTubeIframe;

    /*
     *
     * Getter/Setter Accessors
     *
     */

    /** HTML markup id of where in the DOM the YouTube iframe palyer will be loaded */
    get iframeId(): string {
        return this.config.iframeId;
    }
    /** Width of the YouTube palyer */
    get width(): string {
        return this.config.width;
    }
    /** Height of the YouTube player */
    get height(): string {
        return this.config.height;
    }

    /** Create instance of YouTube iframe API passing in parameters needed to establish the API and player. */
    constructor(config: ApiConfig) {
        this.config = config;
    }

    /*
     *
     * Public Functions
     *
     */

    /** Used to load the YouTube iframe API. This method must be executed before loading a video */
    public loadApi$ = (): Observable<void> => {
        return new Observable(observer => {
            if (this.hasApiBeenLoaded()) {
                this.completeApiLoad(observer);
            }

            // Set listener for YouTube API ready event
            window['onYouTubeIframeAPIReady'] = () => {
                this.completeApiLoad(observer);
            };

            // Load the API - We need to do this in JS so we can trigger the ready event
            const script = document.createElement('script');
            script.id = 'youtubeIframe';
            script.type = 'text/javascript';
            script.src = this.apiSource;
            document.body.appendChild(script);
        });
    };

    /** Load a YouTube video. Video will only load if the API has been loaded.
     * @param {string} videoId The YouTube iframe API only loads YouTube vidoes by their ID.
     */
    public loadVideo = (videoId: string): void => {
        if (this.hasApiBeenLoaded() && this.youTubeIframe) {
            this.player = new this.youTubeIframe.Player(this.config.iframeId, {
                videoId: videoId,
                height: this.config.height,
                width: this.config.width,
                events: {
                    onReady: this.config.onReadyEvent,
                    // onReady: event => {
                    //     console.log('event: %o', event);
                    // },
                    onStateChange: this.config.onStateChangeEvent
                }
            });
        } else {
            console.error('The YouTube iframe API has not been loaded');
            throw 'The YouTube iframe API has not been loaded';
        }
    };

    /*
     *
     * Private Functions
     *
     */

    /** Helper function used to check if the API is already loaded. */
    private hasApiBeenLoaded = (): boolean => {
        const apiScriptElement: HTMLScriptElement = document
            .getElementsByTagName('script')
            .namedItem('youtubeIframe');

        return apiScriptElement && apiScriptElement.src === this.apiSource;
    };

    /** Helper function used by the  `loadApi$` method to compelete the process of loading the
     * YouTube API using the observer passed in. Only called when the API has been successfully
     * loaded.*/
    private completeApiLoad = (observer: Subscriber<void>): void => {
        // Capture the YouTube iframe API
        this.youTubeIframe = <YouTubeIframe>window['YT'];

        // Inform the caller that the API has finished loading.
        observer.next();
        observer.complete();
    };
}
