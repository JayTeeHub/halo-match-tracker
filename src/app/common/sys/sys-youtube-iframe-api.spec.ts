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
import * as YouTubeIframeLoader from 'youtube-iframe';

describe('SysYouTubeIframeApi', () => {
    const mockHtmlId = `player`;

    // Global instance to be used for each test
    beforeEach(() => {});

    it('should load the YouTube API', () => {
        // Arrange
        spyOn(YouTubeIframeLoader, 'load').and.callThrough();

        // Act
        new SysYouTubeIframeApi(mockHtmlId);

        // Assert
        expect(YouTubeIframeLoader.load).toHaveBeenCalled();
    });
});
