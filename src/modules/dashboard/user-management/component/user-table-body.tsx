import React from "react";
import { TableBody } from "@mui/material";
import { UserTableBodyProps } from "@/modules/dashboard/user-management/types/user-table-body-props";
import UserRowContainer from "@/modules/dashboard/user-management/container/user-row-container";

export default function UserTableBody({
                                         users,
                                         handleOpenModal,
                                       }: UserTableBodyProps) {
  return (
    <TableBody>
      {
        users.map((user, index) => (
          <React.Fragment key={user.id}>
            <UserRowContainer user={user} index={index} handleOpenModal={handleOpenModal} />
          </React.Fragment>
        ))
      }
    </TableBody>
  );
}