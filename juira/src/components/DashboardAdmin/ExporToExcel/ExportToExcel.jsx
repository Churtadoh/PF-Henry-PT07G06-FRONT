import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function ExportToExcel ({ apiData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Tooltip title='Exportar a Excel'>
        <IconButton onClick={(e) => exportToCSV(apiData, fileName)}>
            <DownloadRoundedIcon/>
        </IconButton>
    </Tooltip>
    // <button onClick={(e) => exportToCSV(apiData, fileName)}>Exportar a Excel</button>
  );
};
