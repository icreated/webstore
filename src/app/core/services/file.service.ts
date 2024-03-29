import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {AccountService} from '../../api/services/account.service';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private accountService: AccountService) {
    }

    downloadFile(id: number, type: 'order' | 'invoice', documentNo: string) {
        const reader = new FileReader();
        this.accountService.downloadDocument({type, id})
            .subscribe(
                (response) => {
                    saveAs(response, documentNo);
                });
    }
}
