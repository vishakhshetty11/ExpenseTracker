import React, { useState } from 'react';
import "./modal.css";
import { enqueueSnackbar } from 'notistack';
function IncomeModal({ open, onClose, setWalletBalance }) {
    const [income, setIncome] = useState();
    if (!open) return null;

    const handleIncomeChange = (e) => {
        setIncome(e.target.value);
    }

    const handleAddBalance = () => {
        if (Number(income) > 0) {
            setWalletBalance(prev => Number(prev) + Number(income));
            onClose();
        }
        else {
            setIncome("");
            enqueueSnackbar("Invalid Amount!", { variant: "error" });
        }
    }
    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3 className='modalHeader'>Add Balance</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddBalance();
                }}>

                    <input type='number' value={income} placeholder='Income Amount' className='incomeInput' required
                        onChange={handleIncomeChange} />
                    <button type='submit' className='addBalance' >Add Balance</button>
                    <button type='submit' className='btnCancel' onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default IncomeModal