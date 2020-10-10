/** Third-Party Dependencies */
import { Observable, Subscriber, Subscription } from 'rxjs';

/** Used to track how much time has passed in the HCS match and to track when HCS match events
 * occur (ie. game start, game end, game event, etc..). */
export class MatchWatcher {
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

    /** Holds interval instance for emitting when to increase total time passed in the HCS match as
     * well as checking for when HCS match events occur. */
    private watcher$: Observable<any>;

    /** Used to stop the watcher$ */
    private watcherSubscription: Subscription;

    /** Frequency of when to check for new HCS match events and increases total time passed in the
     * HCS match. Value is in seconds. */
    private readonly watcherSpeed: number = 0.83;

    /** Amount of time, in seconds, that has elapsed in the HCS match. Used to check if HCS match events are
     * occuring. */
    private _time: number;

    /*
     *
     * Getter/Setter Accessors
     *
     */

    /** Amount of time, in seconds, that has elapsed in the HCS match. Used to check if HCS match events are
     * occuring. */
    get time(): number {
        return this._time;
    }

    constructor() {}

    /*
     *
     * Public Functions
     *
     */

    /** Start the HCS match watcher */
    public start = (): void => {
        /** TODO (Jordan Turner - 2020-10-10: Assign a rxjs interval to the watcher$ */
        /** TODO (Jordan Turner - 2020-10-10: The interval should do the following:
         * - Increase the time elapsed of the HCS match
         * - Check if an HCS event has occured
         */
    };

    /** Pause the HCS match watcher */
    public pause = (): void => {};

    /** Stop the HCS match watcher */
    public stop = (): void => {};

    /*
     *
     * Private Functions
     *
     */
}
