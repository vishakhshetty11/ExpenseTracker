import "./card.css"
import IncomeModal from './Modals/IncomeModal';
import ExpenseModal from './Modals/ExpenseModal';
export default function Card({ type, amount, openModal }) {
    return (
        <div className='card'>
            <h3>
                {type === "income" ?
                    <span>
                        Wallet Balance: <span style={{ color: "#9dff5a" }}>₹{amount}</span>
                    </span> :
                    <span>
                        Expenses: <span style={{ color: "#f3bb4a" }}>₹{amount}</span>
                    </span>}
            </h3>
            {type === "income" ?
                <>
                    <button className='btnIncome' onClick={openModal}>+ Add Income</button>
                </>
                :
                <>
                    <button className="btnExpense" onClick={openModal}>+ Add Expenses</button>
                </>}
        </div>
    )
}
