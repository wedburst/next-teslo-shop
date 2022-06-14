import { Box, Button } from '@mui/material';
import React from 'react'
import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: string;
    sizes: ISize[];
}

export const SizeSelector = ({selectedSize, sizes}: Props) => {
  return (
    <Box>
        {
            sizes.map((size) => (
                <Button
                    key={size}
                    size="small"
                    color={ selectedSize === size ? 'secondary' : 'info' }
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}
