import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

export type CurrentCoordsInfo = {
    lat: number;
    lng: number;
}

const CurrentCoordsInfo = ({ lat, lng } : CurrentCoordsInfo) => {
    const map = useMap();
    const [currentLat, setCurrentLat] = useState<number>(lat);
    const [currentLong, setCurrentLong] = useState<number>(lng);

    useEffect(() => {
        const handleMouseMove = (e: L.LeafletMouseEvent) => {
            console.log(`Координаты курсора: ${e.latlng.lat}, ${e.latlng.lng}`);
        };
        map.on('mousemove', handleMouseMove);
        return () => {
            map.off('mousemove', handleMouseMove);
        }
    }, [currentLat, currentLong])

    return (
        <Typography>Текущие координатам ({ currentLat } , { currentLong })</Typography>
    )
}

export default CurrentCoordsInfo;