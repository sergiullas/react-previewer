import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridSelectionModel,
  GridRowParams,
} from '@mui/x-data-grid';

interface DataGridWidgetProps {
  title: string;
  widgetId: string;
  rows: GridRowModel[];
  columns: GridColDef[];
  compareSelection: { widgetId: string; city: string }[];
  onCompareSelectionChange: (
    widgetId: string,
    selectionModel: GridSelectionModel
  ) => void;
  onRowClick: (widgetId: string, params: GridRowParams) => void;
}

const DataGridWidget: React.FC<DataGridWidgetProps> = ({
  title,
  widgetId,
  rows,
  columns,
  compareSelection,
  onCompareSelectionChange,
  onRowClick,
}) => {
  const selectionModel = compareSelection
    .filter((item) => item.widgetId === widgetId)
    .map((item) => {
      const match = rows.find((row) => {
        const rowCity = row.city || row.name;
        return rowCity === item.city;
      });
      return match?.id;
    })
    .filter((id) => id !== undefined && id !== null);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      selectionModel={selectionModel} // ✅ Use stable prop
      onRowClick={(params) => onRowClick(widgetId, params)}
      onSelectionModelChange={(newSelectionModel) =>
        onCompareSelectionChange(widgetId, newSelectionModel)
      } // ✅ Use older, stable prop
      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 5, page: 0 },
        },
      }}
      sx={{
        width: '100%',
        height: 300,
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
        },
      }}
    />
  );
};

export default DataGridWidget;
