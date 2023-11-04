import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/Car';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  public cars: Car[] = [];

  constructor(private carService: CarService) { }

  getCars() {
    this.carService.getAll().subscribe((cars: Car[]) => {
      this.cars = cars;
    })
  }

  ngOnInit() {
    this.getCars();
  }
}
