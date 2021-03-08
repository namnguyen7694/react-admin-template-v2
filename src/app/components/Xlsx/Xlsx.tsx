import { Button } from "antd";
import React, { Component } from "react";
import * as XLSX from "xlsx";
export interface Props {
  data: { [key: string]: any }[];
  cols?: string[][];
}
export interface State {}

export default class Xlsx extends Component<Props, State> {
  exportFile() {
    var Heading = this.props.cols;

    var ws = XLSX.utils.aoa_to_sheet(Heading!);
    XLSX.utils.sheet_add_json(ws, this.props.data, {
      header: Object.keys(this.props.data[0]),
      skipHeader: true,
      origin: -1,
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.exportFile()}>Export</Button>
      </div>
    );
  }
}
