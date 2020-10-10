/** Dependencies */
import { MatchWatcher } from './match-watcher';

/** Third-Party Dependencies */
import { Observable, Subscriber, interval } from 'rxjs';

describe('MatchWatcher', () => {
    const clock = jasmine.clock();

    fit('should increase the time elapsed on each interval of the watcher', () => {
        // Arrange
        const matchWatcher = new MatchWatcher();
        const intervalPeriod = matchWatcher['watcherSpeed'];
        clock.install();

        // Act
        matchWatcher.start();
        clock.tick(intervalPeriod);

        // Assert
        expect(matchWatcher.time).toEqual(intervalPeriod);

        // Act
        clock.tick(intervalPeriod);
        expect(matchWatcher.time).toEqual(intervalPeriod * 2);

        // Stop the interval on the watcher and stop the jasmine clock
        matchWatcher['watcherSubscription'].unsubscribe();
        clock.uninstall();
    });
});
