import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// #endregion
const ExpenseCountChart = ({ data }) => {
    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                width: "100%", // 🔥 IMPORTANT
                boxSizing:"border-box"
            }}
        >
            <ResponsiveContainer width="100%" height={260}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                >
                    <CartesianGrid horizontal={false} stroke="#f0f0f0" />

                    {/* value axis */}
                    <XAxis type="number" hide />

                    {/* category axis */}
                    <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        fontSize="11px"
                    />

                    <Tooltip />

                    <Bar
                        dataKey="value"
                        fill="#8b8bd9"
                        radius={[0, 12, 12, 0]}
                        barSize={22}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseCountChart;