
import { Button } from '@mui/material'
import React from 'react'

function AmountCalculatorButton({ content, onClick, color }) {
    return (
        <Button
            variant='contained'
            color={color}
            onClick={onClick}
            sx={{
                fontSize: 24,
            }}

        >
            {content}
        </Button>
    )
}

export default AmountCalculatorButton
