"use client";

import { Button, Card, CardContent, Typography } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import dynamic from "next/dynamic";

const CustomMap = dynamic(() => import('../../components/map/CustomMap'), {
    ssr: false
});

export default function CyclingDashboard() {
    const router = useRouter()

    const fetcher = (url) => axios.get(url).then(res => res.data)
    const { data: stationsAvailability, error } = useSWR("/api/cycling/gira/station/availability", fetcher);

    // Manage the count of bicicletas and docas
    const [countBicicleta, setCountBicicleta] = useState(0);
    const [countDocas, setCountDocas] = useState(0);

    // Runs when stationsAvailability changes
    useEffect(() => {
        if (stationsAvailability) {
            setCountBicicleta(stationsAvailability.data.features.reduce((acc, feature) => acc + feature.properties.num_bicicletas, 0))
            setCountDocas(stationsAvailability.data.features.reduce((acc, feature) => acc + feature.properties.num_docas, 0))
        }
    }, [stationsAvailability])

    if (error) {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Error fetching data! Try again later</h1>
        </div>
    }

    return (
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500">
            <div className="flex items-center justify-between flex-col p-2">
                <p className="text-lg font-bold text-white">Central de Controlo EMEL Bicicletas</p>
            </div>
            <div className="flex flex-wrap-reverse">
                <div className="basis-full sm:basis-1/2 p-6 ">
                    {stationsAvailability && <CustomMap height={"100vh"} center={[38.71635220104923, -9.14669026619318]} zoom={12} geoJsonData={stationsAvailability.data} />}
                </div>
                <div className="basis-full sm:basis-1/2 p-6 ">
                    <Card className="mb-2">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Estações
                            </Typography>
                            <Typography variant="h5" component="div">
                                {stationsAvailability && stationsAvailability.data.features.length || 0}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="mb-2">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Bicicletas Disponíveis
                            </Typography>
                            <Typography variant="h5" component="div">
                                {countBicicleta}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="mb-2">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Docas
                            </Typography>
                            <Typography variant="h5" component="div">
                                {countDocas}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className="mb-2">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Listas
                            </Typography>
                            <Button onClick={() => router.push('/cycling/station/list')} variant="contained" style={{ margin: 10 }}>Abir Lista de Estações</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}