/** Third-Party Dependencies */
import { interval, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    private _time: number = 0;

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
        this.watcher$ = interval(this.watcherSpeed).pipe(tap(this.onInterval));

        // Start the interval & capture the subscription so that we can stop the interval at a later
        // point in time.
        this.watcherSubscription = this.watcher$.subscribe();
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

    /** Helper function used to handle tasks of the HCS match watcher each time a new interval
     * occurs.
     * @param {number} count The number of intervals that have occured since the interval was started
     */
    private onInterval = (count: number): void => {
        // Increase the time that has elapsed in the HCS match
        this._time += this.watcherSpeed;

        /** TODO (Jordan Turner - 2020-10-10: Check if an event has occured in the HCS match */
    };
}
