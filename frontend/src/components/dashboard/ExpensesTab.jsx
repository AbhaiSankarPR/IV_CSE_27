export default function ExpensesTab() {
  const expenses = [
    { title: "First Advance (24/09/2025)", amount: 30000, remaining: 857230 },
    { title: "Second Advance (06/10/2025)", amount: 200000, remaining: 657230 },
    { title: "Third Advance (21/10/2025)", amount: 307010, remaining: 350220 },
    { title: "Ticket Booked", amount: 42113.3 },
    { title: "Additional Expense", amount: 800 },
    { title: "Remaining", amount: 307322 },
  ];

  return (
    <div className="pl-0 md:pl-96 p-4 min-h-screen bg-[#0d0d0d]/30 flex flex-col items-center">
      {/* Expenses Box */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-green-300 font-bodoni">
          Expense Summary
        </h1>
        <div className="space-y-4 text-gray-200 text-lg leading-relaxed">
          {expenses.map((exp, i) => (
            <div key={i}>
              <p className="font-bold text-white text-xl">{exp.title}</p>
              <p>
                Amount: <b>{exp.amount.toLocaleString()}</b>
              </p>
              {exp.remaining && (
                <p>
                  Remaining Amount in Account: <b>{exp.remaining.toLocaleString()}</b>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
