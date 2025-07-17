import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import IncomeList from '../../components/Income/IncomeList';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import DeleteAlert from '../../components/DeleteAlert';
import axiosInstanse from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { toast } from 'react-toastify';
 import useUserAuth from '../../hooks/useUserAuth';

const Income = () => {
   useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstanse.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
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
      await axiosInstanse.post(API_PATHS.INCOME.ADD_INCOME, {
        source, amount, date, icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstanse.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success("Income details deleted successfully.");
      fetchIncomeDetails();
      setOpenDeleteAlert({ show: false, data: null });
    } catch (error) {
      console.error("Failed to delete income:", error.response?.data?.message || error.message);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstanse.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income-details.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download income details:", error);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
  <DashboardLayout activeMenu="Income">
    <div className="my-5 mx-auto">
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading income data...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
      )}
      {/* Modals remain outside */}
      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want to delete this income?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
        />
      </Modal>
    </div>
  </DashboardLayout>
);
};

export default Income;
