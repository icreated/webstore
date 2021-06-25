import {Injectable} from '@angular/core';
import {PrivateService} from './private.service';
import {saveAs} from 'file-saver/FileSaver';

@Injectable({
    providedIn: 'root'
  })
export class FileService {

    constructor(private privateService: PrivateService) {
    }

    downloadfile(id: number, type: string, documentNo: string) {
        const reader = new FileReader();
        this.privateService.getPdfFile(id, type)
            .subscribe(
                (response) => {
                    saveAs(response, documentNo);
                });
    }
}
