import { Injectable } from '@angular/core';
import { IOrderDetail } from '../models/OrderDetail';

@Injectable({
  providedIn: 'root'
})
export class TransformService {

  constructor() { }

  transformOrderDetailsToText(orderDetails: IOrderDetail[]): string {
    if (orderDetails.length < 1) {
      return '';
    }
    let description: string = orderDetails.map(od => od.quantity + ' ' + od.item.name + ` ($${od.item.price})`)
      .reduce((accumulator, element) => accumulator + ', ' + element);
    const totalCost: number = orderDetails.map(od => od.item.price * od.quantity)
      .reduce((accumulator, element) => accumulator + element);
    description += ' = $' + totalCost;
    return description;
  }

  // tslint:disable-next-line:variable-name
  transformDateToText(_date: Date | string): string {
    const date: Date = new Date(_date); // json has no Date types, only string
    const months: string[] = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    const monthInt: number = date.getMonth();  // The month index is 0 based to 11

    const dateDescription: string = months[monthInt] + date.getDate().toString()
        + date.getFullYear().toString();
    return dateDescription;
  }
}
