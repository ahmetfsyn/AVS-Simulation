import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

function Header() {
    const city = {
        name: 'tarsus belediyesi',
    }

    return (
        <Box
            flexDirection={'row'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
            p={2}
            bgcolor={'rgba(0,0,0,0.6)'}
            borderRadius={5}

        >
            <Avatar
                sx={{
                    width: 128,
                    height: 128,
                }}
                src="img/tarsusLogo.png" alt="" />
            <Typography
                color='white'
                variant='h3'
            >
                {city.name.toLocaleUpperCase("tr")}
            </Typography>
        </Box>)
}

export default Header