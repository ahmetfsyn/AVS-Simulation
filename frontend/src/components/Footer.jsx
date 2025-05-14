
import React from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Grid2, Typography } from '@mui/material'
import { FaArrowCircleRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { showMessage } from '../utils/showMessage';
function Footer({ canNext, onNext, onCancel, isLoading }) {

    const navigate = useNavigate();

    const goTo = (path) => {
        navigate(path);
    }

    const onClickNext = () => {
        onNext();
    }

    const onClickCancel = () => {
        onCancel();
        showMessage({
            title: "İşleminiz İptal Edildi !",
            icon: 'error',
            timer: 3000,
            showConfirmButton: false
        });
        goTo("/");
    }

    return (
        <Grid2
            size={12}>
            <Box
                mt={2}
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Button
                    size='large'
                    variant='contained'
                    color='error'
                    startIcon={<MdCancel color='white'></MdCancel>}
                    onClick={onClickCancel}

                >
                    İptal
                </Button>
                {canNext && (
                    <Button
                        variant='contained'
                        size='large'
                        color='success'
                        endIcon={<FaArrowCircleRight color='white'></FaArrowCircleRight>}
                        onClick={onClickNext}
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        İleri
                    </Button>
                )}

            </Box>

        </Grid2>)
}

export default Footer