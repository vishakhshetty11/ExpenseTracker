import React, { useEffect, useState } from 'react';
import "./modal.css";
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
function ExpenseModal({ open, onClose, walletBalance, setWalletBalance, expenseList, setExpenseList, editId }) {
    const [formdata, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        date: ""
    })

    useEffect(() => {
        if (!editId) return;

        const selectedExpense = expenseList.find(item => item.id === editId);
        if (!selectedExpense) return;

        setFormData({
            title: selectedExpense.title,
            price: selectedExpense.price,
            category: selectedExpense.category,
            date: selectedExpense.date
        });
    }, [editId]);
    if (!open) { return null };

    const handleExpenseChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        if (Number(formdata.price) <= Number(walletBalance)) {
            const newId = uuidv4();
            setExpenseList(prev => [{ ...formdata, id: newId }, ...prev]);
            setWalletBalance(prev => Number(prev) - Number(formdata.price));
            setFormData({
                title: "",
                price: "",
                category: "",
                date: ""
            })
            onClose();
        }
        else {
            enqueueSnackbar("Price should be less than the wallet balance", { variant: "error" });
        }

    }
    const handleEditExpense = (e) => {
        e.preventDefault();
        const updated = expenseList.map(item => {
            if (item.id === editId) {
                const priceDifference = Number(item.price) - Number(formdata.price);
                if (priceDifference < 0 && Math.abs(formdata.price) > walletBalance) {
                    enqueueSnackbar("Price Should be less than wallet balance", { variant: "error" });
                    onClose();
                    return { ...item };
                }
                setWalletBalance(prev => (Number(prev) + Number(priceDifference)));
                return { ...formdata, id: editId };
            }
            else {
                return { ...item };
            }
        })
        
        setFormData({
            title: "",
            price: "",
            category: "",
            date: ""
        })
        setExpenseList(updated);
        onClose();

    }
    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3 className='modalHeader'>Add Expense</h3>
                <form onSubmit={editId ? handleEditExpense : handleExpenseSubmit}>
                    <div style={{ marginBottom: "10px" }}>
                        <input type='text' placeholder='Title' className='expenseInput'
                            name="title" value={formdata.title} required onChange={handleExpenseChange} />
                        <input type='number' min={1} placeholder='Price' className='expenseInput'
                            name="price" value={formdata.price} required onChange={handleExpenseChange} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <select className='expenseCat' name='category' value={formdata.category} required onChange={handleExpenseChange} >
                            <option value="">Select category</option>
                            <option value="food">food</option>
                            <option value="travel">travel</option>
                            <option value="entertainment">entertainment</option>
                        </select>
                        <input type='date' className='expenseInput' name="date" value={formdata.date}
                            required onChange={handleExpenseChange} />
                    </div>
                    <button type='submit' className='addBalance'>{editId ? "Edit Expense" : "Add Expense"}</button>
                    <button type='submit' className='btnCancel' onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default ExpenseModal