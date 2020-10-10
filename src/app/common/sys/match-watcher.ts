/** Third-Party Dependencies */
import { Observable, Subscriber } from 'rxjs';

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

    /** Frequency of when to check for new HCS match events and increases total time passed in the
     * HCS match. Value is in milliseconds */
    private readonly watcherSpeed: number = 830;

    constructor() {}

    /*
     *
     * Public Functions
     *
     */

    /** Start the HCS match watcher */
    public start = (): void => {};

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
