/*
 *
 * Dependencies
 *
 */
import { YouTubeIframe, YouTubeIframePlayer } from '../interfaces/youtube-iframe.interface';

/*
 *
 * Third-Party Dependencies
 *
 */
import { Observable, Subscriber } from 'rxjs';

/** System level service that is used to load and mointor a YouTube player in the API throught the
 * YouTube iframe API. */
export class SysYouTubeIframeApi {
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

    /** YouTube API link reference */
    private readonly apiSource = 'https://www.youtube.com/iframe_api';

    /** HTML id used by the YouTube API to render the iframe. */
    private readonly iframeId: string;

    /** Holds the YouTube iFrame API instance after it has been loaded. */
    private youTubeIframe: YouTubeIframe;

    /** Instance of YouTube video player, used to control/mointor the video player. */
    private player: YouTubeIframePlayer;

    /** Height of the YouTube player */
    private readonly height: string;

    /** Width of the YouTube palyer */
    private readonly width: string;

    /** Event handler called by the YouTube player once the player is ready. */
    private readonly onReadyEvent: Function;

    /** Event handler called by the YouTube player when the state of the video changes (ie.
     * PAUSED, PLAYING, ENDED, etc...). */
    private readonly onStateChangeEvent: Function;

    /** Create instance of YouTube iframe API passing in parameters needed to establish the API and player. */
    constructor(
        htmlId: string,
        width: string,
        height: string,
        onReadyEvent: Function,
        onStateChangeEvent: Function
    ) {
        this.iframeId = htmlId;
        this.width = width;
        this.height = height;
        this.onReadyEvent = onReadyEvent;
        this.onStateChangeEvent = onStateChangeEvent;
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
            this.player = new this.youTubeIframe.Player(this.iframeId, {
                videoId: videoId,
                height: this.height,
                width: this.width,
                events: {
                    onReady: this.onReadyEvent,
                    onStateChange: this.onStateChangeEvent
                }
            });
        } else {
            console.error('The YouTube iframe API has not been loaded');
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
