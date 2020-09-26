/*
 *
 * Dependencies
 *
 */
import { SysYouTubeIframeApi } from './sys-youtube-iframe-api';

/*
 *
 * Third-Party Dependencies
 *
 */
import { switchMap } from 'rxjs/operators';

describe('SysYouTubeIframeApi', () => {
    const mockHtmlId: string = `player`;
    const mockWidth: string = '640';
    const mockHeight: string = '390';
    const mockVideoId: string = 'M7lc1UVf-VE';
    const mockOnReadyEvent: Function = () => {};
    const mockOnStateChangeEvent: Function = () => {};

    const youtubeIframeApi = 'https://www.youtube.com/iframe_api';

    it('should load the YouTube API', done => {
        // Arrange
        const sysYouTubeIframeApi = new SysYouTubeIframeApi(
            mockHtmlId,
            mockWidth,
            mockHeight,
            mockOnReadyEvent,
            mockOnStateChangeEvent
        );

        // Act
        sysYouTubeIframeApi.loadApi$().subscribe(() => {
            // Assert
            expect(<any>window['onYouTubeIframeAPIReady']).toBeDefined();
            expect(<any>sysYouTubeIframeApi['youTubeIframe']).toBeDefined();
            expect(document.getElementsByTagName('script').namedItem('youtubeIframe').src).toEqual(
                youtubeIframeApi
            );

            // Complete
            done();
        });
    });

    it('should return right away if the YouTube API has already been loaded', done => {
        // Arrange
        const sysYouTubeIframeApi = new SysYouTubeIframeApi(
            mockHtmlId,
            mockWidth,
            mockHeight,
            mockOnReadyEvent,
            mockOnStateChangeEvent
        );

        // Act
        sysYouTubeIframeApi
            .loadApi$()
            .pipe(switchMap(() => sysYouTubeIframeApi.loadApi$()))
            .subscribe(() => {
                // Assert
                expect(
                    document.getElementsByTagName('script').namedItem('youtubeIframe').src
                ).toEqual(youtubeIframeApi);

                // Complete
                done();
            });
    });

    it('should load a YouTube video into an iframe', done => {
        // Arrange
        const sysYouTubeIframeApi = new SysYouTubeIframeApi(
            mockHtmlId,
            mockWidth,
            mockHeight,
            mockOnReadyEvent,
            mockOnStateChangeEvent
        );

        // Act
        sysYouTubeIframeApi.loadApi$().subscribe(() => {
            // Arrange
            spyOn(<any>sysYouTubeIframeApi['youTubeIframe'], 'Player');

            // Act
            sysYouTubeIframeApi.loadVideo(mockVideoId);

            // Assert
            expect(<any>sysYouTubeIframeApi['youTubeIframe'].Player).toHaveBeenCalledWith(
                mockHtmlId,
                {
                    videoId: mockVideoId,
                    height: mockHeight,
                    width: mockWidth,
                    events: {
                        onReady: mockOnReadyEvent,
                        onStateChange: mockOnStateChangeEvent
                    }
                }
            );

            // Complete
            done();
        });
    });

    it('should console an error when trying to load a video without loading the API', () => {
        // Arrange
        const sysYouTubeIframeApi = new SysYouTubeIframeApi(
            mockHtmlId,
            mockWidth,
            mockHeight,
            mockOnReadyEvent,
            mockOnStateChangeEvent
        );
        spyOn(console, 'error');

        // Act
        sysYouTubeIframeApi.loadVideo(mockVideoId);

        // Assert
        expect(console.error).toHaveBeenCalledWith('The YouTube iframe API has not been loaded');
    });
});
