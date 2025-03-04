import { Box, Typography } from '@mui/material'
import React from 'react'
import { motion } from "framer-motion";

function TouchForProcessBox() {
    return (

        <Box
            display={'flex'}
        >
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                }}

            >

                <Box
                    bgcolor={'rgba(0, 0, 0, 0.6)'}
                    p={2}
                    borderRadius={5}
                >
                    <Typography
                        variant='h3'
                        color='white'
                        textAlign={'center'}
                    >
                        İŞLEME BAŞLAMAK İÇİN EKRANA DOKUNUNUZ

                    </Typography>


                </Box>
            </motion.div>

        </Box>




    )
}

export default TouchForProcessBox