import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";
import {FileSaverService} from "ngx-filesaver";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {
  @Input("table-id") tableId?: string;

  tableRawContent?: string;
  tableContent: string[][] = [];

  constructor(private storage: StorageService, private fileSaver: FileSaverService) {}

  ngOnInit() {
    if (this.tableId != undefined) {
      this.storage.getTable(this.tableId).subscribe(table => {
        this.tableRawContent = table;
        this.tableContent = table
          .split(/\r?\n/)
          .map(row => row.split(/;/));
      });
    }
  }

  downloadTable() {
    if (this.tableRawContent != undefined) {
      const blob = new Blob([this.tableRawContent], {
        type: "text/plain"
      });
      this.fileSaver.save(blob, this.tableId + ".csv");
    }
  }
}
