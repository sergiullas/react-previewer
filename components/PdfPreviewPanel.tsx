// components/PdfPreviewPanel.tsx

import React, { RefObject, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PdfPreviewPanelProps {
  city: string;
  widgetId: string;
  onClose: () => void;
  pdfMap: Record<string, string>;
  closeButtonRef: RefObject<HTMLButtonElement>;
}

const PdfPreviewPanel: React.FC<PdfPreviewPanelProps> = ({
  city,
  widgetId,
  onClose,
  pdfMap,
  closeButtonRef,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        closeButtonRef.current &&
        document.activeElement !== closeButtonRef.current
      ) {
        closeButtonRef.current.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [city, closeButtonRef]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 64,
        right: 0,
        height: 'calc(100vh - 64px)',
        width: 900,
        maxWidth: 900,
        minWidth: 250,
        backgroundColor: 'background.paper',
        boxShadow: 6,
        borderLeft: '1px solid #ccc',
        zIndex: 1300,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-preview-title"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" id="pdf-preview-title">
          Document preview ({widgetId})
        </Typography>
        <IconButton
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close document preview"
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          mt: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <iframe
          title="PDF Preview"
          src={pdfMap[city]}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Box>
    </Box>
  );
};

export default PdfPreviewPanel;
