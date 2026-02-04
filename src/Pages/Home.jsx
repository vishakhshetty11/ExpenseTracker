import React, { useEffect, useState } from 'react';
import './Home.css';
import { Grid } from "@mui/material";
import Card from '../components/Card';
import IncomeModal from '../components/Modals/IncomeModal';
import ExpenseModal from '../components/Modals/ExpenseModal';
import ExpenseList from '../components/ExpenseList';
import CustomPieChart from '../components/Charts/PieChart';
import ExpenseCountChart from '../components/Charts/BarChart';
function Home() {
    const [walletBalance, setWalletBalance] = useState(0);
    const [expenses, setExpenses] = useState(0)
    const [expenseList, setExpenseList] = useState([]);
    const [isMount, setIsMount] = useState(false);

    const [openIncome, setOpenIncome] = useState(false);
    const [openExpense, setOpenExpense] = useState(false);
    const [categoryAmount, setCategoryAmount] = useState({
        food: 0,
        entertainment: 0,
        travel: 0
    });
    const [categoryCount, setCategoryCount] = useState({
        food: 0,
        entertainment: 0,
        travel: 0
    })
    const [editId, setEditId] = useState("");
    useEffect(() => {
        const balance = localStorage.getItem("WalletBalance");
        if (balance) {
            setWalletBalance(balance);
        }
        else {
            setWalletBalance(5000);
            localStorage.setItem("WalletBalance", 5000);
        }

        const storedExpenses = localStorage.getItem("expenses");
        const items = storedExpenses ? JSON.parse(storedExpenses) : [];
        setExpenseList(items || []);
        setIsMount(true);

    }, []);
    useEffect(() => {
        if (expenseList.length > 0 || isMount) {
            localStorage.setItem("expenses", JSON.stringify(expenseList));
        }
        if (expenseList.length > 0) {
            const totalExpense = expenseList.reduce(
                (sum, currentValue) => sum + Number(currentValue.price), 0)
            setExpenses(totalExpense);
        }
        else {
            setExpenses(0);
        }
        let foodAmount = 0, travelAmount = 0, entertainmentAmount = 0;
        let foodCount = 0, travelCount = 0, entertainmentCount = 0;
        expenseList.forEach(item => {
            if (item.category === "food") {
                foodAmount += Number(item.price);
                foodCount++
            }
            else if (item.category === "travel") {
                travelAmount += Number(item.price);
                travelCount++
            }
            else if (item.category === "entertainment") {
                entertainmentAmount += Number(item.price);
                entertainmentCount++
            }
        });
        setCategoryAmount({
            food: foodAmount,
            travel: travelAmount,
            entertainment: entertainmentAmount
        })
        setCategoryCount({
            food: foodCount,
            travel: travelCount,
            entertainment: entertainmentCount
        })
    }, [expenseList])
    useEffect(() => {
        if (isMount) {
            localStorage.setItem("WalletBalance", walletBalance);
        }
    }, [walletBalance]);



    return (
        <div>
            <h1>Expense Tracker</h1>
            <div className='cardDiv'>
                <Grid container spacing={2}>
                    <Grid  size={{ xs: 12, sm: 3, md:4, lg:4 }} >
                        <Card type="income" amount={walletBalance} openModal={() => setOpenIncome(true)} />
                    </Grid>
                    <Grid  size={{ xs: 12, sm: 3, md:4, lg:4 }}>
                        <Card type="expense" amount={expenses} openModal={() => setOpenExpense(true)} />
                    </Grid>
                    <Grid  size={{ xs: 12, sm: 6, md:4, lg:4 }}>
                        <CustomPieChart data={[
                            { name: "Food", value: categoryAmount.food },
                            { name: "Travel", value: categoryAmount.travel },
                            { name: "Entertainment", value: categoryAmount.entertainment },
                        ]} />
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={2} mt={3} >
                <Grid size={{ xs: 12, sm: 12, md:8, lg:8 }}>
                    <h3>Recent Transactions</h3>
                    <ExpenseList data={expenseList} setExpenseList={setExpenseList} setWalletBalance={setWalletBalance}
                        setEditId={setEditId} openModal={() => setOpenExpense(true)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md:4, lg:4 }}>
                    <h3>Top Expenses</h3>
                    <ExpenseCountChart data={[
                        { name: "Entertainment", value: categoryCount.entertainment },
                        { name: "Food", value: categoryCount.food },
                        { name: "Travel", value: categoryCount.travel },
                    ]} />
                </Grid>
            </Grid>
            <IncomeModal open={openIncome} onClose={() => setOpenIncome(false)} setWalletBalance={setWalletBalance} />
            <ExpenseModal open={openExpense} onClose={() => setOpenExpense(false)}
                walletBalance={walletBalance} setWalletBalance={setWalletBalance}
                expenseList={expenseList} setExpenseList={setExpenseList} editId={editId} />
        </div>
    )
}

export default Home