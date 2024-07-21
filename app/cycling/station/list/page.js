"use client";

import useSWR from 'swr'
import { useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Backdrop, Button, css, Modal, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from 'axios';
import dynamic from 'next/dynamic';

const CustomMap = dynamic(() => import('../../../components/map/CustomMap'), {
    ssr: false
});

export default function StationList() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [selectedStation, setSelectedStation] = useState({
        id_expl: 0,
        estacaolocalizacao: "",
        dispbicicleta: 0,
    });

    // Fetch data from the server
    const fetcher = (url) => axios.get(url).then(res => res.data)
    const { data: stations, error } = useSWR("/api/cycling/gira/station/list", fetcher);

    // Handle error 
    if (error) {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Error fetching data!</h1>
        </div>
    }

    // Handle loading
    if (!stations) {
        return <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Loading...</h1>
        </div>
    }

    // Render Data
    return <div className="flex bg-[url('/bicycle.jpg')]  bg-repeat bg-center shadow-xl rounded-lg min-h-screen flex-col items-center justify-between p-24" >
        {/* Modal (show map) */}
        <CustomModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
        >
            <ModalContent sx={{ width: 400 }}>
                <h2 id="unstyled-modal-title" className="modal-title">
                    {selectedStation.estacaolocalizacao} - {selectedStation.dispbicicleta}
                </h2>

                <CustomMap height={200} center={[selectedStation.latitude, selectedStation.longitude]} zoom={16} marker={{ position: [selectedStation.latitude, selectedStation.longitude], popUpText: `${selectedStation.estacaolocalizacao} - ${selectedStation.dispbicicleta}` }} />
            </ModalContent>
        </CustomModal>

        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >Localização</TableCell>
                            <TableCell align="right">Bicicletas Disponíveis</TableCell>
                            <TableCell align="right">WiFi</TableCell>
                            <TableCell >Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stations.data.map((station) => (
                            <TableRow
                                key={station.estacaolocalizacao + station.id_expl}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {station.id_expl || "No ID"}
                                </TableCell>
                                <TableCell>{station.estacaolocalizacao}</TableCell>
                                <TableCell align="right">{station.dispbicicleta}</TableCell>
                                <TableCell align="right">{station.wifi ? 'Sim' : 'Não'}</TableCell>
                                <TableCell >
                                    <Button onClick={() => {
                                        setSelectedStation(station);
                                        setOpen(true);
                                    }} variant="contained">Mapa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
}

// Source: https://github.com/mui/material-ui/blob/v5.16.4/docs/data/base/components/modal/ModalUnstyled.tsx
const CustomModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
);