/** Dependencies */
import { MatchWatcher } from './match-watcher';

/** Third-Party Dependencies */

describe('MatchWatcher', () => {
    const clock = jasmine.clock();

    it('should initialize and start the watcher the first time the start method is called', () => {
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

        // Assert
        expect(matchWatcher.time).toEqual(intervalPeriod * 2);

        clock.uninstall();
    });

    it('should start the watcher when instance already occurs by emitting a start watcher event', () => {
        // Arrange
        const matchWatcher = new MatchWatcher();
        const intervalPeriod = matchWatcher['watcherSpeed'];
        clock.install();

        spyOn(matchWatcher['startWatcher$'], 'next');

        // Mock that the watcher has already started
        matchWatcher.start();
        clock.tick(intervalPeriod);

        // Act
        matchWatcher.start();
        clock.tick(intervalPeriod);

        // Assert
        expect(matchWatcher['startWatcher$'].next).toHaveBeenCalled();
        expect(matchWatcher.time).toEqual(intervalPeriod * 2);

        clock.uninstall();
    });

    it('should pause the watcher interval from increasing the time elapsed', () => {
        // Arrange
        const matchWatcher = new MatchWatcher();
        const intervalPeriod = matchWatcher['watcherSpeed'];
        clock.install();

        spyOn(matchWatcher['suspendWatcher$'], 'next').and.callThrough();

        // Mock that the watcher has already started
        matchWatcher.start();
        clock.tick(intervalPeriod);

        // Act
        matchWatcher.pause();

        // Mock time passing to ensure that the pause method worked.
        clock.tick(intervalPeriod);

        // Assert
        expect(matchWatcher.time).toEqual(intervalPeriod);
        expect(matchWatcher['suspendWatcher$'].next).toHaveBeenCalled();

        clock.uninstall();
    });

    it('should reset the match watcher time elapsed when the stop method is called', () => {
        // Arrange
        const matchWatcher = new MatchWatcher();
        const intervalPeriod = matchWatcher['watcherSpeed'];
        clock.install();

        // Mock that the watcher has already started
        matchWatcher.start();
        clock.tick(intervalPeriod);

        // Act
        matchWatcher.stop();

        // Mock time passing to ensure that the watcher is terminated.
        clock.tick(intervalPeriod);

        // Assert
        expect(matchWatcher.time).toEqual(0);

        clock.uninstall();
    });

    it('should terminate the match watcher when the stop method is called', () => {
        // Arrange
        const matchWatcher = new MatchWatcher();
        const intervalPeriod = matchWatcher['watcherSpeed'];
        clock.install();

        spyOn(matchWatcher['suspendWatcher$'], 'next').and.callThrough();
        spyOn(matchWatcher['terminateWatcher$'], 'next').and.callThrough();

        // Mock that the watcher has already started
        matchWatcher.start();
        clock.tick(intervalPeriod);

        // Arrange
        spyOn(matchWatcher['watcherSubscription'], 'unsubscribe').and.callThrough();

        // Act
        matchWatcher.stop();

        // Mock time passing to ensure that the watcher is terminated.
        clock.tick(intervalPeriod);

        // Assert
        expect(matchWatcher['suspendWatcher$'].next).toHaveBeenCalled();
        expect(matchWatcher['terminateWatcher$'].next).toHaveBeenCalled();
        expect(matchWatcher['watcherSubscription'].unsubscribe).toHaveBeenCalled();
        expect(matchWatcher['watcher$']).toEqual(null);

        clock.uninstall();
    });
});
