import { Box, Button } from '@mui/material';
import React from 'react'
import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: string;
    sizes: ISize[];

    // Method
    onSelectedSize: (size: ISize ) => void;
}

export const SizeSelector = ({selectedSize, sizes, onSelectedSize}: Props) => {
  return (
    <Box>
        {
            sizes.map((size) => (
                <Button
                    key={size}
                    size="small"
                    color={ selectedSize === size ? 'secondary' : 'info' }
                    onClick={() => onSelectedSize(size)}
                >
                    { size }
                </Button>
            ))
        }
    </Box>
  )
}
