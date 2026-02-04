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
    return (
        <>
            {data.length === 0 ? (
                <p>No transactions</p>
            ) : (
                <ul id="transaction-list" className="transaction-container">
                    {data.map((expense, index) => (
                        <li key={index} className="transaction-item">
                            {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)} - {expense.price}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );

}

export default ExpenseList