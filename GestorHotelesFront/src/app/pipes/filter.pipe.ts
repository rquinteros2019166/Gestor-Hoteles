import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(values2: any, args: any): any {
    var values = values2;
    const resultHotel = [];
    for(const hotels of values){
      if(hotels.name.toLowerCase().indexOf(args.toLowerCase()) > -1 || hotels.address.toLowerCase().indexOf(args.toLowerCase()) > -1){
        resultHotel.push(hotels)
      };

    };
    return resultHotel;
  }

  /*transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }*/
}


