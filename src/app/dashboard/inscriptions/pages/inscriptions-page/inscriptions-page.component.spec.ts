import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InscriptionsPageComponent } from './inscriptions-page.component';
import { InscriptionsService } from '../../services/inscriptions.service';
import { SharedModule } from '../../../../shared/shared.module';

describe('InscriptionsPageComponent', () => {
  let component: InscriptionsPageComponent;
  let fixture: ComponentFixture<InscriptionsPageComponent>;
  let inscriptionsService: InscriptionsService;
  let getInscriptionsSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscriptionsPageComponent],
      imports: [HttpClientTestingModule, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionsPageComponent);
    component = fixture.componentInstance;
    inscriptionsService = TestBed.inject(InscriptionsService);
    getInscriptionsSpy = spyOn(
      inscriptionsService,
      'getInscriptions'
    ).and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the inscriptions when starting the component', () => {
    component.inscriptionsService.getInscriptions();
    expect(getInscriptionsSpy).toHaveBeenCalled();
  });
});
