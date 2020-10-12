/** Third-Party Dependencies */
import { interval, Observable, Subject, Subscription, merge, NEVER } from 'rxjs';
import { takeUntil, tap, startWith, switchMap } from 'rxjs/operators';

/**
 *
 * Enums
 *
 */

/** Available states that the watcher can have. Used by the Subjects that control the state of the
 * watcher. */
enum WatcherState {
    Start = 'start',
    Suspend = 'suspend'
}

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
    private watcher$: Observable<number>;

    /** Frequency of when to check for new HCS match events and increases total time passed in the
     * HCS match. Value is in seconds. This value matches the frequency at which the YouTube iframe
     * updates its time. */
    private readonly watcherSpeed: number = 0.83;

    /** Amount of time, in seconds, that has elapsed in the HCS match. Used to check if HCS match events are
     * occurring. */
    private _time: number = 0;

    /** Used by the watcher$ to start tracking the HCS match. */
    private startWatcher$: Subject<WatcherState.Start> = new Subject();

    /** Used by the watcher$ to pause/stop tracking the HCS match. */
    private suspendWatcher$: Subject<WatcherState.Suspend> = new Subject();

    /** Used to terminate the watcher$ Observable to prevent memory leaking. */
    private terminateWatcher$: Subject<void> = new Subject();

    /** Used to prevent memory leaks when using the watcher$ */
    private watcherSubscription: Subscription;

    /*
     *
     * Getter/Setter Accessors
     *
     */

    /** Amount of time, in seconds, that has elapsed in the HCS match. Used to check if HCS match events are
     * occurring. */
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
        if (!this.watcher$) {
            this.watcher$ = this.getWatcher$();

            // Start the watcher
            this.watcherSubscription = this.watcher$.subscribe();
        } else {
            this.startWatcher$.next(WatcherState.Start);
        }
    };

    /** Pause the HCS match watcher */
    public pause = (): void => {
        this.suspendWatcher$.next(WatcherState.Suspend);
    };

    /** Stop the HCS match watcher */
    public stop = (): void => {
        // Reset the time
        this._time = 0;

        // Emit to stop counting and terminate the interval
        this.suspendWatcher$.next();
        this.terminateWatcher$.next();

        // Clean up the watcher
        this.watcherSubscription.unsubscribe();
        this.watcher$ = null;
    };

    /*
     *
     * Private Functions
     *
     */

    /** Helper function used to build and return the operation of the watcher. This method
     * establishes how the watcher will track the HCS match */
    private getWatcher$ = (): Observable<number> => {
        return merge(this.startWatcher$, this.suspendWatcher$).pipe(
            takeUntil(this.terminateWatcher$),
            // Our initial state is to start the watcher
            startWith(WatcherState.Start),
            switchMap(state => {
                return state === WatcherState.Start
                    ? interval(this.watcherSpeed).pipe(tap(this.onInterval))
                    : NEVER;
            })
        );
    };

    /** Helper function used to handle tasks of the HCS match watcher each time a new interval
     * occurs.
     * @param {number} count The number of intervals that have occurred since the interval was started
     */
    private onInterval = (count: number): void => {
        // Increase the time that has elapsed in the HCS match
        this._time += this.watcherSpeed;

        /** TODO (Jordan Turner - 2020-10-10: Check if an event has occurred in the HCS match */
    };
}
