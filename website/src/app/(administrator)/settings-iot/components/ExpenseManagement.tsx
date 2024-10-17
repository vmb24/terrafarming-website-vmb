import React, { useState } from 'react';

interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
}

const ExpenseManagement: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, date: '2023-06-01', description: 'Sementes', amount: 500 },
    { id: 2, date: '2023-06-02', description: 'Fertilizantes', amount: 300 },
    { id: 3, date: '2023-06-03', description: 'Manutenção de equipamentos', amount: 200 },
  ]);

  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    date: '',
    description: '',
    amount: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = expenses.length + 1;
    setExpenses((prev) => [...prev, { ...newExpense, id }]);
    setNewExpense({ date: '', description: '', amount: 0 });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Gerenciamento de Gastos</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Data
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Valor
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Adicionar Gasto
        </button>
      </form>
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Valor</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{expense.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{expense.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseManagement;