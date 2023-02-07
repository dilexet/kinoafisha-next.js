import React from "react";

export interface TableManagementContainerProps {
  title: string;
  loadData: () => void;
  handleOpenModal: (value: string) => void;
  loadingStatus: string;
  errorMessage: string | undefined | null | [];
  TableHead: React.ReactElement;
  TableBody: React.ReactElement;
}
