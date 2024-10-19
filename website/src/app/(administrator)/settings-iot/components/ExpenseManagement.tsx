import React, { useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';

interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
}

const ExpenseManagement: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    date: '',
    description: '',
    amount: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = expenses.length + 1;
    setExpenses((prev) => [...prev, { ...newExpense, id }]);
    setNewExpense({ date: '', description: '', amount: 0 });
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    // Aqui você normalmente atualizaria o backend
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target;
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, [name]: name === 'amount' ? parseFloat(value) : value } : expense
    ));
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Gerenciamento de Gastos</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Data
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Valor
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 rounded mb-8"
            required
          />
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Adicionar Gasto
        </button>
      </form>
      
      <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mt-6">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingId === expense.id ? (
                      <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={(e) => handleEditChange(e, expense.id)}
                        className="w-full p-1 bg-gray-700 rounded"
                      />
                    ) : expense.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingId === expense.id ? (
                      <input
                        type="text"
                        name="description"
                        value={expense.description}
                        onChange={(e) => handleEditChange(e, expense.id)}
                        className="w-full p-1 bg-gray-700 rounded"
                      />
                    ) : expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingId === expense.id ? (
                      <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={(e) => handleEditChange(e, expense.id)}
                        className="w-full p-1 bg-gray-700 rounded"
                      />
                    ) : `R$ ${expense.amount.toFixed(2)}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === expense.id ? (
                      <button onClick={() => handleSave(expense.id)} className="text-green-500 hover:text-green-700 mr-2">
                        <FaSave />
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(expense.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                        <FaEdit />
                      </button>
                    )}
                    <button onClick={() => handleDelete(expense.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                  Nenhum gasto registrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseManagement;