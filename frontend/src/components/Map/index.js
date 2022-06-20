import React from 'react';
import { Container } from '@mui/material';
import MapComponent from './MapComponent';

const Map = () => {
    return (
        <Container maxWidth="md">
            <MapComponent />
        </Container> 
    );
};

export default Map;