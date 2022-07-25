import { IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"


import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
interface Props {
    currentValue: number;
    maxvalue: number;

    // Method
    updateQuantity: (newValue: number) => void;
}

export const ItemCounter = ({currentValue, updateQuantity, maxvalue}: Props) => {

    const addOrRemove = (value: number) => {
        if( value === -1 ) {
            if (currentValue === 1) return;

            return updateQuantity(currentValue - 1);
        }

        if ( currentValue >= maxvalue ) return;

        updateQuantity(currentValue + 1);
    }

  return (
      <Box display="flex" alignItems="center">
          <IconButton onClick={ () => addOrRemove(-1) }>
              <RemoveCircleOutlineOutlinedIcon />
          </IconButton>
          <Typography sx={{width: 40, textAlign: "center"}}>{currentValue}</Typography>
          <IconButton onClick={ () => addOrRemove(+1) }>
              <AddCircleOutlineOutlinedIcon />
          </IconButton>
      </Box>
  )
}