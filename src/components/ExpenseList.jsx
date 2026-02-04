import React, { useEffect, useState } from 'react'
import { List, Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Typography, Divider } from '@mui/material';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./ExpenseList.css"
function ExpenseList({ data, setExpenseList, setWalletBalance, setEditId, openModal }) {

    const maxRecord = 3;
    const [currentExpenseList, setCurrentExpenseList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totaPages, setTotalPages] = useState(0);

    const fetchData = (id) => {
        setEditId(id);
        openModal(true);
    }
    const deleteExpense = (id) => {
        const selectedData = data.find(item => item.id === id);
        const amount = selectedData.price;
        setWalletBalance(prev => Number(prev) + Number(amount));
        const newData = data.filter(item => item.id != id);
        setExpenseList(newData);
    }
    useEffect(() => {
        const startIndex = (currentPage - 1) * maxRecord;
        const lastIndex = Math.min(currentPage * maxRecord, data.length);
        const currentList = data.slice(startIndex, lastIndex);
        setCurrentExpenseList(currentList);
        setTotalPages(Math.ceil(data.length / maxRecord))
    }, [currentPage, data]);
    useEffect(() => {
        if (totaPages < currentPage && currentPage > 1) {
            setCurrentPage(prev => Number(prev) - 1)
        }
    }, [totaPages])
    return (
        <div>
            {data.length === 0 ?
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', color: "black", borderRadius: "10px" }}
                >
                    <ListItem>
                        <ListItemText id="switch-list-label-wifi" primary="No Transactions" />
                    </ListItem>
                </List>
                :
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', color: "black", borderRadius: "10px" }}
                >
                    {currentExpenseList.length > 0 && currentExpenseList.map((item) => (
                        <React.Fragment key={item.id}>
                            <ListItem>
                                <ListItemIcon>
                                    <span style={{ backgroundColor: '#d7d7d7', borderRadius: "50%", padding: "10px 8px 2px" }}>
                                        {item.category === "food" && <LocalPizzaIcon />}
                                        {item.category === "travel" && <LocalAirportIcon />}
                                        {item.category === "entertainment" && <TheaterComedyIcon />}
                                    </span>
                                </ListItemIcon>
                                <ListItemText id="switch-list-label-wifi" primary={item.title} secondary={item.date} />
                                <Typography edge="end" mr={2} sx={{ color: "#f4bb4a" }}>₹{item.price}</Typography>
                                <Button edge="end" sx={{ marginRight: "10px" }} variant='contained'
                                    className='btn btnDanger' onClick={() => { deleteExpense(item.id) }} >
                                    <CancelIcon sx={{ fontSize: "15px" }} />
                                </Button>
                                <Button edge="end" variant='contained' className='btn btnWarning' onClick={() => { fetchData(item.id) }}  >
                                    <EditIcon sx={{ fontSize: "15px" }} />
                                </Button>
                            </ListItem>
                            <Divider sx={{ mx: 2, mb: 1 }} />
                        </React.Fragment>
                    ))}
                    {totaPages > 1 &&
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                            <button disabled={currentPage === 1}
                                style={{ backgroundColor: "#f1f1f1", borderRadius: "50%", padding: "5px 10px", color: "#000" }} onClick={() =>
                                    setCurrentPage(prev => prev - 1)}><ArrowBackIcon /></button>
                            <button style={{ backgroundColor: "#43967b" }}>{currentPage}</button>
                            <button disabled={currentPage === totaPages}
                                style={{ backgroundColor: "#f1f1f1", borderRadius: "50%", padding: "5px 10px", color: "#000" }} onClick={() =>
                                    setCurrentPage(prev => prev + 1)}><ArrowForwardIcon /></button>
                        </div>}
                </List>}
        </div>
    )
}

export default ExpenseList