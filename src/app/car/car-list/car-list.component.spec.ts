import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { CarListComponent } from "./car-list.component";
import { DebugElement } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { faker } from '@faker-js/faker';
import { CarService } from "src/app/core/services/car.service";
import { Car } from "src/app/core/models/Car";

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [CarListComponent],
      providers: [CarService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;

    const brandOne = faker.lorem.word();
    const brandTwo = faker.lorem.word();

    for (let i = 0; i < 3; i++) {
      const car = new Car(
        faker.number.int(),
        (i % 2) === 0 ? brandOne : brandTwo,
        faker.lorem.word(),
        faker.number.int(),
        faker.number.int(),
        faker.color.human(),
        faker.image.url(),
      );
      component.cars.push(car);
    }
    component.calculateTotals();

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 car rows', () => {
    const tds = debug.queryAll(By.css('td.td-main'));
    expect(tds).toHaveSize(9);

    for (let index = 0; index < component.cars.length; index++) {
      const increase = index * 3;
      expect(tds[0 + increase].nativeElement.textContent).toContain(component.cars[index].marca);
      expect(tds[1 + increase].nativeElement.textContent).toContain(component.cars[index].linea);
      expect(tds[2 + increase].nativeElement.textContent).toContain(component.cars[index].modelo);
    }
  });

  it('should have 2 brand total rows', () => {
    const tds = debug.queryAll(By.css('td.td-second'));
    expect(tds).toHaveSize(4);

    for (let index = 0; index < component.totalBrand.length; index++) {
      const increase = index * 2;
      expect(tds[0 + increase].nativeElement.textContent).toContain(component.totalBrand[index].brand);
      expect(tds[1 + increase].nativeElement.textContent).toContain(component.totalBrand[index].total);
    }
  });
});
