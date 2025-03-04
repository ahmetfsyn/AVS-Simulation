import { Button } from '@mui/material'
import React from 'react'

function CompanyButton({ goToCardReaderPage, company }) {


    return (
        <Button
            variant='contained'
            color='warning'
            size='large'

            sx={{
                height: 75,
                width: 250,
            }}

            onClick={() => goToCardReaderPage(company.url)}
        >
            {company.name}
        </Button>)
}

export default CompanyButton