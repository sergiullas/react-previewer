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
  const [compareMode, setCompareMode] = useState(false);
  const [compareSelection, setCompareSelection] = useState([]);
  const [pdfPreview, setPdfPreview] = useState({ widgetId: null, city: null });

  const lastFocusedRowRef = useRef(null);
  const closeButtonRef = useRef(null);

  const handleRowClick = useCallback(
    (widgetId, params) => {
      if (!pdfPreview.city) lastFocusedRowRef.current = document.activeElement;
      const city = cityMap[params.row.id];
      setPdfPreview({ widgetId, city });
    },
    [pdfPreview.city]
  );

  const handleCompareSelectionChange = (widgetId, selectionModel) => {
    const selected = selectionModel
      .map((id) => ({ widgetId, city: cityMap[id] }))
      .filter((item) => item.city);

    setCompareSelection((prev) => {
      const others = prev.filter((item) => item.widgetId !== widgetId);
      const next = [...others, ...selected].slice(-2);
      return next;
    });
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Dashboard
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <IconButton
              color={compareMode ? 'secondary' : 'default'}
              onClick={() => {
                setCompareMode(!compareMode);
                setCompareSelection([]);
              }}
              aria-label="Toggle compare mode"
            >
              <Typography variant="body2" sx={{ color: 'white' }}>
                {compareMode ? 'Exit Compare' : 'Compare Mode'}
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            padding: 2,
            position: 'relative',
            overflow: 'auto',
            minWidth: '1200px',
            width: pdfPreview.city ? `calc(100% + 900px)` : '100%',
            paddingRight: pdfPreview.city ? '900px' : undefined,
            transition: 'padding-right 0.3s ease-in-out',
          }}
        >
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
                  compareMode={compareMode}
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
                  compareMode={compareMode}
                  compareSelection={compareSelection}
                  onCompareSelectionChange={handleCompareSelectionChange}
                  onRowClick={handleRowClick}
                />
              </WidgetCard>
            </div>

            <div key="3">
              <WidgetCard title="Widget 3">
                <Typography variant="body2">Static content</Typography>
              </WidgetCard>
            </div>
            <div key="4">
              <WidgetCard title="Widget 4">
                <Typography variant="body2">Static content</Typography>
              </WidgetCard>
            </div>
            <div key="5">
              <WidgetCard title="Widget 5">
                <Typography variant="body2">Static content</Typography>
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
