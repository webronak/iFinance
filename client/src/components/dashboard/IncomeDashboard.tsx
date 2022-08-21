import React, { useState, useEffect, useCallback } from "react";
import DashboardForm from "./dashboardForm";
import { DataScreen, FormScreen, GraphContainer } from "./styles";
import { incomeTypes } from "constants/appConstants";
import {
  useGetIncomes,
  useDeleteIncome,
  usePostIncome,
  useGetIncome,
  useUpdateIncome,
} from "query";
import CustomTable from "components/common/table/Table";
import { TableData } from "components/common/table/types";
import { FormDataType } from "./types";
import BarGraph from "components/common/graphs/BarGraph";

const IncomeDashboard = () => {
  const [editFieldId, setEditFieldId] = useState<string>("");
  const { data: tableData, isLoading: isDataLoading } = useGetIncomes();
  const { mutate: deleteMutation } = useDeleteIncome();
  const { mutate: postMutation, isLoading: postLoading } = usePostIncome();
  const { mutate: updateMutation, isLoading: updationLoading } =
    useUpdateIncome();
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        id: 1,
        label: "Amount",
        data: [],
        backgroundColor: ["rgba(53, 162, 235, 0.5)"],
      },
    ],
  });
  const { data: editableData } = useGetIncome(editFieldId);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    amount: 0,
    tag: "",
  });

  const handleDelete = (id: string) => {
    deleteMutation(id);
  };

  const handleEdit = (id: string) => {
    setEditFieldId(id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      [e.target.name.toLowerCase()]: e.target.value,
    }));
  };

  const handleTagClick = (tagName: string) => {
    setFormData((prev) => ({
      ...prev,
      tag: tagName,
    }));
  };

  const handleUpload = useCallback(() => {
    if (editFieldId) {
      updateMutation({
        ...formData,
        id: editFieldId,
      });
      setEditFieldId("");
    } else {
      postMutation(formData);
    }
    setFormData({
      title: "",
      description: "",
      amount: 0,
      tag: "",
    });
  }, [editFieldId, formData]);

  useEffect(() => {
    if (editableData && editFieldId) {
      const { title, description, amount, tag } = editableData;
      setFormData({
        title,
        description,
        amount,
        tag,
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
            backgroundColor: ["rgba(53, 162, 235, 0.5)"],
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
              <BarGraph data={graphData} title="Incomes of this month" />
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
          title="Add New Income"
          editFieldId={editFieldId}
          handleChange={handleChange}
          handleUpload={handleUpload}
          data={formData}
          handleTagClick={handleTagClick}
          isLoading={updationLoading || postLoading}
          tags={incomeTypes}
        />
      </FormScreen>
    </>
  );
};

export default IncomeDashboard;
