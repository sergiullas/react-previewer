// components/WidgetCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, children }) => (
  <Card variant="outlined" sx={{ height: '100%', overflow: 'hidden' }}>
    <CardContent
      sx={{
        height: '100%',
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        className="drag-handle"
        tabIndex={0}
        role="button"
        aria-label={`Move ${title}`}
        sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'grab' }}
      >
        <DragIndicatorIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>{children}</Box>
    </CardContent>
  </Card>
);

export default React.memo(WidgetCard);
