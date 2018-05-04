import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TabsChangeService {

    public tabsChangeEvent: EventEmitter<any>;

    constructor() {
        this.tabsChangeEvent = new EventEmitter();
    }
/**
 * 根据num跳转相应的tab
 * 
 * @param {Number} num 
 * @memberof tabsChangeService
 */
public change(num:Number){
       this.tabsChangeEvent.emit(num);
   }
  
}