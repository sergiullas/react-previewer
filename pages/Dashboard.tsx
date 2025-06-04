// pages/Dashboard.tsx

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Responsive as ResponsiveGridLayout,
  WidthProvider,
} from 'react-grid-layout';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  IconButton,
  InputBase,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import WidgetCard from '../components/WidgetCard';
import PdfPreviewPanel from '../components/PdfPreviewPanel';
import DataGridWidget from '../components/DataGridWidget';

import { layout } from '../constants/layout';
import { columns, rows1, rows2, cityMap } from '../constants/mockData';
import { pdfMap } from '../constants/pdfMap';

const ResponsiveGridLayoutWithWidth = WidthProvider(ResponsiveGridLayout);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Dashboard() {
  const theme = createTheme();
  const [compareSelection, setCompareSelection] = useState([]);
  const [pdfPreview, setPdfPreview] = useState({ widgetId: null, city: null });

  const lastFocusedRowRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleRowClick = useCallback((widgetId, params) => {
    if (!pdfPreview.city) lastFocusedRowRef.current = document.activeElement;
    const city = cityMap[params.row.id];
    setPdfPreview({ widgetId, city });
  }, [pdfPreview.city]);

  const handleCompareSelectionChange = useCallback((widgetId, selectionModel) => {
    const selectedIds = Array.isArray(selectionModel) ? selectionModel : [selectionModel];

    const newItems = selectedIds
      .map((id) => cityMap[id])
      .filter(Boolean)
      .map((city) => ({ widgetId, city }));

    setCompareSelection((prev) => {
      const filteredPrev = prev.filter((item) => item.widgetId !== widgetId);
      const merged = [...filteredPrev, ...newItems];
      const deduped = Array.from(
        new Map(merged.map((item) => [item.city, item])).values()
      );
      return deduped.slice(0, 3);
    });
  }, []);

  const handleCompare = useCallback(() => {
    if (compareSelection.length >= 2) {
      setPdfPreview({ widgetId: 'compare', city: null });
    }
  }, [compareSelection]);

  const handleDownload = useCallback(() => {
    if (compareSelection.length === 0) return;

    const selectedCities = compareSelection.map(item => item.city);
    const dataToDownload = {
      timestamp: new Date().toISOString(),
      cities: selectedCities,
    };

    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `selected-cities-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [compareSelection]);

  const handleClosePreview = useCallback(() => {
    if (lastFocusedRowRef.current) lastFocusedRowRef.current.focus();
    setPdfPreview({ widgetId: null, city: null });
  }, []);

  useEffect(() => {
    if (!pdfPreview?.city || !closeButtonRef.current) return;
    const timer = setTimeout(() => {
      if (document.activeElement !== closeButtonRef.current) {
        closeButtonRef.current?.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [pdfPreview?.city]);

  const showFloatingPanel = pdfPreview.city || (pdfPreview.widgetId === 'compare' && compareSelection.length >= 2);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            padding: 2,
            position: 'relative',
            overflow: 'auto',
            minWidth: '1200px',
            width: showFloatingPanel ? `calc(100% + 900px)` : '100%',
            paddingRight: showFloatingPanel ? '900px' : undefined,
            transition: 'padding-right 0.3s ease-in-out',
          }}
        >
          <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
            <Button variant="outlined" disabled={compareSelection.length === 0} onClick={handleDownload}>
              Download ({compareSelection.length})
            </Button>
            <Button
              variant="contained"
              disabled={compareSelection.length < 2}
              onClick={handleCompare}
            >
              Compare ({compareSelection.length >= 2 ? '✓' : compareSelection.length}/2)
            </Button>
          </Box>

          <ResponsiveGridLayoutWithWidth
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            draggableHandle=".drag-handle"
            margin={[10, 10]}
            containerPadding={[10, 10]}
          >
            <div key="1">
              <WidgetCard title="Main Widget 1">
                <DataGridWidget
                  title="Main Widget 1"
                  widgetId="widget1"
                  rows={rows1}
                  columns={columns}
                  compareSelection={compareSelection}
                  onCompareSelectionChange={handleCompareSelectionChange}
                  onRowClick={handleRowClick}
                />
              </WidgetCard>
            </div>

            <div key="2">
              <WidgetCard title="Main Widget 2">
                <DataGridWidget
                  title="Main Widget 2"
                  widgetId="widget2"
                  rows={rows2}
                  columns={columns}
                  compareSelection={compareSelection}
                  onCompareSelectionChange={handleCompareSelectionChange}
                  onRowClick={handleRowClick}
                />
              </WidgetCard>
            </div>
          </ResponsiveGridLayoutWithWidth>

          {pdfPreview.city && (
            <PdfPreviewPanel
              city={pdfPreview.city}
              widgetId={pdfPreview.widgetId}
              onClose={handleClosePreview}
              pdfMap={pdfMap}
              closeButtonRef={closeButtonRef}
            />
          )}

          {pdfPreview.widgetId === 'compare' && compareSelection.length >= 2 && (
            <Box
              sx={{
                position: 'fixed',
                top: 64,
                right: 0,
                height: 'calc(100vh - 64px)',
                width: '900px',
                backgroundColor: 'background.paper',
                boxShadow: 6,
                borderLeft: '1px solid #ccc',
                zIndex: 1300,
                display: 'flex',
              }}
            >
              <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1301 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClosePreview}
                  ref={closeButtonRef}
                >
                  Close
                </Button>
              </Box>
              {compareSelection.slice(0, 2).map((doc, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    borderLeft: index === 1 ? '1px solid #ccc' : 'none',
                  }}
                >
                  <iframe
                    title={`Compare ${doc.city}`}
                    src={pdfMap[doc.city]}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
