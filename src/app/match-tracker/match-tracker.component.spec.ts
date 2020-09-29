/*
 *
 * Angular Dependencies
 *
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/*
 *
 * Dependencies
 *
 */
import { MatchTrackerComponent, VideoPlayerConfig } from './match-tracker.component';

/*
 *
 * Third-Party Dependencies
 *
 */
import { of } from 'rxjs';

describe('MatchTrackerComponent', () => {
    let component: MatchTrackerComponent;
    let fixture: ComponentFixture<MatchTrackerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MatchTrackerComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MatchTrackerComponent);
        component = fixture.componentInstance;
        component['sysYouTubeIframeApi'].loadApi$ = jasmine
            .createSpy('loadApi$')
            .and.returnValue(of(null));
        component['sysYouTubeIframeApi'].loadVideo = jasmine.createSpy('loadVideo');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the system YouTube iframe API instance defined correctly', () => {
        // Assert
        expect(component['sysYouTubeIframeApi'].iframeId).toEqual(VideoPlayerConfig.iframeId);
        expect(component['sysYouTubeIframeApi'].height).toEqual(VideoPlayerConfig.Height);
        expect(component['sysYouTubeIframeApi'].width).toEqual(VideoPlayerConfig.Width);
    });

    it('should load the YouTube API on init', done => {
        // Arrange

        // Act
        component.ngOnInit();

        fixture.whenStable().then(() => {
            //Assert
            expect(component['sysYouTubeIframeApi'].loadApi$).toHaveBeenCalled();
            done();
        });
    });

    it('should load a HCS match video into the YouTube iframe', done => {
        // Arrange

        // Act

        fixture.whenStable().then(() => {
            // Assert
            expect(component['sysYouTubeIframeApi'].loadVideo).toHaveBeenCalledWith(
                component['hcsYoutubeId']
            );
            done();
        });
    });
});
