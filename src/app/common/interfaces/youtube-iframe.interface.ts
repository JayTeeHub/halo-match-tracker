/**
 * All interfaces used by the `youtube-iframe` third-party package. The package itself came with no
 * interfaces. The third-party package this interface file is for can be found here:
 * https://www.npmjs.com/package/youtube-iframe.
 */

/*
 *
 * Enums
 *
 */

/** All possible states that a YouTube Player can have/emit */
enum PlayerState {
    BUFFERING = 3,
    CUED = 5,
    ENDED = 0,
    PAUSED = 2,
    PLAYING = 1,
    UNSTARTED = -1
}

/*
 *
 * Interfaces
 *
 */

/** All possible events that the API fires for a YouTube iframe player. Supply event listeners that
 * the API will call when those events occur. */
interface Events {
    onReady: Function;
    onStateChange: Function;
}

/** All paramters that need to/can be supplied to create an instance of the YouTubeIframe Player. */
interface PlayerOptions {
    /** How tall the YouTube iframe should be rendered */
    height: string;
    /** How wide the YouTube iframe should be rendered. */
    width: string;
    /** Which YouTube video should be loaded into the iframe */
    videoId: string;
    events: Events;
}

/** Create a newable object that will allow for a new instance of a YouTube iframe Palyer to be made */
interface ConstructablePlayer<YouTubeIframePlayer> {
    /** Renders a YouTube iframe.
     * @param {string} playerHtmlId id of the HTML element where the API will insert the iframe
     */
    new (playerHtmlId: string, playerOptions: PlayerOptions): YouTubeIframePlayer;
}

/** Paramteres that allow you to access and control the instance of a YouTube iframe Player. */
export interface YouTubeIframePlayer {
    /** Access the current time of the video being played */
    getCurrentTime(): number;
}

/** All methods & parameters availabe to a YouTube iframe instance after the API has been loaded. */
export interface YouTubeIframe {
    Player: ConstructablePlayer<YouTubeIframePlayer>;
    PlayerState: PlayerState;
}
