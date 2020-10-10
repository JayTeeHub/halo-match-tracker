/** Angular Dependencies */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/** Halo Match Tracker Dependencies */
import { MatchVideoContainerComponent, VideoPlayerConfig } from './match-video-container.component';

/** Dependencies */
import { ApiConfig, SysYouTubeIframeApi } from 'src/app/common/sys/sys-youtube-iframe-api';

/** Third-Party Dependencies */
import { of } from 'rxjs';

class MockSysYouTubeIframeApi extends SysYouTubeIframeApi {
    loadApi$ = jasmine.createSpy('loadApi$').and.returnValue(of(null));
    loadVideo = jasmine.createSpy('loadVideo');
    player = <any>{
        seekTo: jasmine.createSpy('seekTo')
    };
}

describe('MatchVideoContainerComponent', () => {
    let component: MatchVideoContainerComponent;
    let fixture: ComponentFixture<MatchVideoContainerComponent>;

    const mockIframeApiConfig: ApiConfig = {
        iframeId: VideoPlayerConfig.iframeId,
        height: VideoPlayerConfig.Height,
        width: VideoPlayerConfig.Width,
        onReadyEvent: () => {},
        onStateChangeEvent: () => {}
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MatchVideoContainerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MatchVideoContainerComponent);
        component = fixture.componentInstance;
        // Add spies so we can assert that the iframe methods are called correctly
        // component['sysYouTubeIframeApi'].loadApi$ = jasmine
        //     .createSpy('loadApi$')
        //     .and.returnValue(of(null));
        // component['sysYouTubeIframeApi'].loadVideo = jasmine.createSpy('loadVideo');
        // component['sysYouTubeIframeApi'].player = <any>{
        //     seekTo: jasmine.createSpy('seekTo')
        // };
        component['sysYouTubeIframeApi'] = new MockSysYouTubeIframeApi(mockIframeApiConfig);

        fixture.detectChanges();
    });

    it('should create', () => {
        component['sysYouTubeIframeApi'] = new MockSysYouTubeIframeApi(mockIframeApiConfig);
        expect(component).toBeTruthy();
    });

    it('should have the system YouTube iframe API instance defined correctly', () => {
        // Arrange
        component['sysYouTubeIframeApi'] = new MockSysYouTubeIframeApi(mockIframeApiConfig);

        // Assert
        expect(component['sysYouTubeIframeApi'].iframeId).toEqual(VideoPlayerConfig.iframeId);
        expect(component['sysYouTubeIframeApi'].height).toEqual(VideoPlayerConfig.Height);
        expect(component['sysYouTubeIframeApi'].width).toEqual(VideoPlayerConfig.Width);
    });

    it('should load the YouTube API on init', done => {
        // Arrange
        component['sysYouTubeIframeApi'] = new MockSysYouTubeIframeApi(mockIframeApiConfig);

        // Act
        component.ngOnInit();

        fixture.whenStable().then(() => {
            //Assert
            expect(component['sysYouTubeIframeApi'].loadApi$).toHaveBeenCalled();
            done();
        });
    });

    it('should load a HCS match video into the YouTube iframe', done => {
        fixture.whenStable().then(() => {
            // Assert
            expect(component['sysYouTubeIframeApi'].loadVideo).toHaveBeenCalledWith(
                component['hcsYoutubeId']
            );
            done();
        });
    });

    it('should set a new time for the HCS match when the user hits the enter key', done => {
        // Arrange
        const mockKeyboardEvent: any = {
            key: 'Enter',
            target: {
                value: '13.50'
            }
        };

        // Act
        component.onKeyDownSetTime(mockKeyboardEvent);

        fixture.whenStable().then(() => {
            //Assert
            expect(component['sysYouTubeIframeApi'].player.seekTo).toHaveBeenCalledWith(810, true);
            done();
        });
    });

    it('should not set the new time when no new time has been provided by the user', done => {
        // Arrange
        const mockKeyboardEvent: any = {
            key: 'Enter',
            target: {
                value: ''
            }
        };

        // Act
        component.onKeyDownSetTime(mockKeyboardEvent);
        fixture.whenStable().then(() => {
            //Assert
            expect(component['sysYouTubeIframeApi'].player.seekTo).not.toHaveBeenCalled();
            done();
        });
    });

    it('should not set the new time when no valid number is provided by the user', done => {
        // Arrange
        const mockKeyboardEvent: any = {
            key: 'Enter',
            target: {
                value: 'asdfe'
            }
        };

        spyOn(console, 'error');

        // Act
        component.onKeyDownSetTime(mockKeyboardEvent);
        fixture.whenStable().then(() => {
            //Assert
            expect(component['sysYouTubeIframeApi'].player.seekTo).not.toHaveBeenCalled();
            expect(console.error).toHaveBeenCalledWith(
                'a valid time was not given, the HCS match will reset.'
            );
            done();
        });
    });
});
