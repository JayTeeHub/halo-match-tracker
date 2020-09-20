/*
 *
 * Dependencies
 *
 */
import { YouTubeIframe } from '../interfaces/youtube-iframe.interface';

/*
 *
 * Third-Party Dependencies
 *
 */
import * as YouTubeIframeLoader from 'youtube-iframe';

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

    /** HTML id used by the YouTube API to render the iframe. */
    private readonly iframeId: string;

    /** Holds the YouTube iFrame API instance after it has been loaded. */
    private readonly youTubeIframe: YouTubeIframe;

    /** Create instance and load the YouTube iframe API. */
    constructor(htmlId: string) {
        this.iframeId = htmlId;
        /** TODO (Jordan Turner - 2020-09-20: Load API */
    }

    /*
     *
     * Public Functions
     *
     */

    /** Load a YouTube video. Video will only load if the API has been loaded. */
    public loadVideo = (): void => {
        /** TODO (Jordan Turner - 2020-09-20: WIP */
    };

    /*
     *
     * Private Functions
     *
     */
}
