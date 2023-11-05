import { Component, OnInit } from '@angular/core';
import { Car } from '../../core/models/Car';
import { CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  public cars: Car[] = [];
  public totalBrand: { brand: string, total: number }[] = [];

  public isVisibleTotalBrand = false;

  constructor(private carService: CarService) { }

  getCars() {
    this.carService.getAll().subscribe((cars: Car[]) => {
      this.cars = cars;
      this.calculateTotals();
    })
  }

  calculateTotals() {
    const brands: Record<string, number> = {};

    this.cars.forEach((car: Car) => {
      if (!brands[car.marca]) {
        brands[car.marca] = 1;
      } else {
        brands[car.marca] += 1;
      }
    });

    Object.keys(brands).forEach(key => {
      this.totalBrand.push({ brand: key, total: brands[key] });
    });

    this.isVisibleTotalBrand = this.totalBrand.length > 0;
  }

  ngOnInit() {
    this.getCars();
  }
}
