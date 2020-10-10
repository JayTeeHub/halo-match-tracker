// /*
//  *
//  * Dependencies
//  *
//  */
// import { SysYouTubeIframeApi, ApiConfig } from './sys-youtube-iframe-api';

// /*
//  *
//  * Third-Party Dependencies
//  *
//  */
// import { switchMap } from 'rxjs/operators';
// import { of } from 'rxjs';

// describe('SysYouTubeIframeApi', () => {
//     const mockVideoId: string = 'M7lc1UVf-VE';
//     const mockApiConfig: ApiConfig = {
//         iframeId: 'player',
//         width: '640',
//         height: '390',
//         onReadyEvent: () => {},
//         onStateChangeEvent: () => {}
//     };

//     class MockSysYouTubeIframeApi extends SysYouTubeIframeApi {
//         loadApi$ = jasmine.createSpy('loadApi$').and.returnValue(of(null));
//         loadVideo = jasmine.createSpy('loadVideo');
//         player = <any>{
//             seekTo: jasmine.createSpy('seekTo')
//         };
//     }

//     const youtubeIframeApi = 'https://www.youtube.com/iframe_api';

//     it('should load the YouTube API', done => {
//         // Arrange
//         const sysYouTubeIframeApi = new MockSysYouTubeIframeApi(mockApiConfig);

//         // Act
//         sysYouTubeIframeApi.loadApi$().subscribe(() => {
//             // Assert
//             expect(<any>window['onYouTubeIframeAPIReady']).toBeDefined();
//             expect(<any>sysYouTubeIframeApi['youTubeIframe']).toBeDefined();
//             expect(document.getElementsByTagName('script').namedItem('youtubeIframe').src).toEqual(
//                 youtubeIframeApi
//             );

//             // Complete
//             done();
//         });
//     });

//     it('should return right away if the YouTube API has already been loaded', done => {
//         // Arrange
//         const sysYouTubeIframeApi = new MockSysYouTubeIframeApi(mockApiConfig);

//         // Act
//         sysYouTubeIframeApi
//             .loadApi$()
//             .pipe(switchMap(() => sysYouTubeIframeApi.loadApi$()))
//             .subscribe(() => {
//                 // Assert
//                 expect(
//                     document.getElementsByTagName('script').namedItem('youtubeIframe').src
//                 ).toEqual(youtubeIframeApi);

//                 // Complete
//                 done();
//             });
//     });

//     it('should load a YouTube video into an iframe', done => {
//         // Arrange
//         const sysYouTubeIframeApi = new MockSysYouTubeIframeApi(mockApiConfig);

//         // Act
//         sysYouTubeIframeApi.loadApi$().subscribe(() => {
//             // Arrange
//             spyOn(<any>sysYouTubeIframeApi['youTubeIframe'], 'Player');

//             // Act
//             sysYouTubeIframeApi.loadVideo(mockVideoId);

//             // Assert
//             expect(<any>sysYouTubeIframeApi['youTubeIframe'].Player).toHaveBeenCalledWith(
//                 mockApiConfig.iframeId,
//                 {
//                     videoId: mockVideoId,
//                     height: mockApiConfig.height,
//                     width: mockApiConfig.width,
//                     events: {
//                         onReady: mockApiConfig.onReadyEvent,
//                         onStateChange: mockApiConfig.onStateChangeEvent
//                     }
//                 }
//             );

//             // Complete
//             done();
//         });
//     });

//     it('should console an error when trying to load a video without loading the API', () => {
//         // Arrange
//         const sysYouTubeIframeApi = new MockSysYouTubeIframeApi(mockApiConfig);
//         spyOn(console, 'error');

//         // Act
//         try {
//             sysYouTubeIframeApi.loadVideo(mockVideoId);
//         } catch (e) {}

//         // Assert
//         expect(sysYouTubeIframeApi.loadVideo).toThrow('The YouTube iframe API has not been loaded');
//         expect(console.error).toHaveBeenCalledWith('The YouTube iframe API has not been loaded');
//     });
// });
