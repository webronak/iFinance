import React, { useState, useEffect, useCallback } from "react";
import DashboardForm from "./dashboardForm";
import { DataScreen, FormScreen, GraphContainer } from "./styles";
import {
  usePostExpense,
  useGetExpenses,
  useDeleteExpense,
  useUpdateExpense,
  useGetExpense,
} from "query";
import { expenseTypes } from "constants/appConstants";
import CustomTable from "components/common/table/Table";
import { FormDataType } from "./types";
import BarGraph from "components/common/graphs/BarGraph";
import { TableData } from "components/common/table/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseDashboard = () => {
  const [editFieldId, setEditFieldId] = useState<string>("");
  const { data: tableData, isLoading: isDataLoading } = useGetExpenses();
  const { mutate: deleteMutation } = useDeleteExpense();
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        id: 1,
        label: "Amount",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
      },
    ],
  });
  const { mutate: postMutation, isLoading: postLoading } = usePostExpense();
  const { mutate: updateMutation, isLoading: updationLoading } =
    useUpdateExpense();
  const { data: editableData } = useGetExpense(editFieldId);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    amount: 0,
    tag:""
  });

  const handleDelete = (id: string) => {
    deleteMutation(id);
  };

  const handleEdit = (id: string) => {
    setEditFieldId(id);
  };

  const handleTagClick = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      tag: tagName
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      [e.target.name.toLowerCase()]: e.target.value,
    }));
  };

  const handleUpload = useCallback(() => {
    if (editFieldId) {
      updateMutation({
        ...formData,
        id: editFieldId,
      });
    } else {
      postMutation(formData);
    }
    setFormData({
      title: "",
      description: "",
      amount: 0,
      tag:"",
    });
  }, [editFieldId, formData]);

  useEffect(() => {
    if (editableData && editFieldId) {
      const { title, description, amount, tag } = editableData;
      setFormData({
        title,
        description,
        amount,
        tag
      });
    }
  }, [editableData, editFieldId]);

  useEffect(() => {
    if (tableData)
      setGraphData({
        labels: tableData ? tableData.map((obj: TableData) => obj.title) : [],
        datasets: [
          {
            id: 1,
            label: "Amount",
            backgroundColor: ["rgba(255, 99, 132, 0.5)"],
            data: tableData
              ? tableData.map((obj: TableData) => obj.amount)
              : [],
          },
        ],
      });
  }, [tableData]);

  return (
    <>
      <DataScreen>
        {!isDataLoading && Object.keys(graphData).length > 0 && (
          <>
            <GraphContainer>
              <BarGraph data={graphData} title="Expenses of this month" />
            </GraphContainer>
            <CustomTable
              data={tableData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </>
        )}
      </DataScreen>
      <FormScreen>
        <DashboardForm
          title="Add New Expense"
          editFieldId={editFieldId}
          handleChange={handleChange}
          handleUpload={handleUpload}
          data={formData}
          handleTagClick={handleTagClick}
          isLoading={updationLoading || postLoading}
          tags={expenseTypes}
        />
      </FormScreen>
    </>
  );
};

export default ExpenseDashboard;
