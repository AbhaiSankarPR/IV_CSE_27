export default function ExpensesTab() {
  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/20">
      <h1 className="text-3xl font-bold mb-6 text-green-300 bodoni-moda">Expense Summary</h1>

      <div className="space-y-5 text-gray-200 text-lg leading-relaxed">
        <p>Total Advance Paid to Explore World = <b>5,49,860</b></p>
        <p>Took Tickets on 30/10/2025 = <b>42,113.30</b></p>

        <hr className="border-gray-600" />

        <p className="font-bold text-white text-xl mt-4">First Advance (24/09/2025)</p>
        <p>Amount: <b>30,000</b></p>
        <p>Remaining Amount in Account: <b>857,230</b></p>

        <p className="font-bold text-white text-xl mt-4">Second Advance (06/10/2025)</p>
        <p>Amount: <b>2,00,000</b></p>
        <p>Remaining Amount in Account: <b>657,230</b></p>

        <p className="font-bold text-white text-xl mt-4">Third Advance (21/10/2025)</p>
        <p>Amount: <b>3,07,010</b></p>
        <p>Remaining Amount in Account: <b>350,220</b></p>

        <p className="font-bold text-white text-xl mt-4">Ticket Booked</p>
        <p>Amount: <b>42,113.3</b></p>

        <p>800 Additional Expense for train booking</p>

        <p className="font-bold text-white text-xl mt-4">Remaining: <b>307,322</b></p>
      </div>
    </div>
  );
}
