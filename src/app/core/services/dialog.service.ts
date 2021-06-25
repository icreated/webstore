/**
 * Created by spok on 26/06/16.
 */
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns promise resolving to `true`=confirm or `false`=cancel
   */
  confirm(message?: string) {
    return new Promise<boolean>(resolve => {
      return resolve(window.confirm(message || 'It\'s OK?'));
    });
  }
}
