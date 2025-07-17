/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { toast } from 'react-toastify';
 import useUserAuth from '../../hooks/useUserAuth';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import ExpenseList from '../../components/Expense/ExpenseList';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';

const Expense = () => {
   useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Fetch all expense data
  const fetchExpenseDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add expense
  const handleAddExpense = async (expense) => {
    const { source, amount, date, icon } = expense;

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense details deleted successfully.");
      fetchExpenseDetails();
      setOpenDeleteAlert({ show: false, data: null });
    } catch (error) {
      console.error("Failed to delete expense:", error.response?.data?.message || error.message);
    }
  };

  // Handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense-details.csv'); // or 'expense-details.pdf'
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download expense details:", error);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading expenses...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
            />
          </div>
        )}

        {/* Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
