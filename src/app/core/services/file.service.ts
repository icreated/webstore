import { inject, Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { AccountService } from '@api/services/account.service';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    private readonly accountService = inject(AccountService);

    downloadFile(id: number, type: 'order' | 'invoice', documentNo: string) {
        this.accountService.downloadDocument({ type, id }).subscribe(
            response => saveAs(response, documentNo)
        );
    }
}
