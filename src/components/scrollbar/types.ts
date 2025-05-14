import type { ComponentProps } from 'react';
import type SimpleBar from 'simplebar-react';
import type { Theme, SxProps } from '@mui/material/styles';

type SimplebarProps = ComponentProps<typeof SimpleBar>;

// ----------------------------------------------------------------------

export type ScrollbarProps = SimplebarProps &
  React.ComponentProps<'div'> & {
    sx?: SxProps<Theme>;
    fillContent?: boolean;
    slotProps?: {
      wrapperSx?: SxProps<Theme>;
      contentSx?: SxProps<Theme>;
      contentWrapperSx?: SxProps<Theme>;
    };
  };
