import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Address} from '../../../api/models/address';

export interface AddressAction {
  label: string;
  icon: string;
  buttonClass: string;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  @Input() address: Address = { name: '', location: {} } as Address;
  @Input() actions: AddressAction[] = [];
  @Output() actionEvent = new EventEmitter<AddressAction>();


  onClick(action: AddressAction) {
    this.actionEvent.emit(action);
  }

}
