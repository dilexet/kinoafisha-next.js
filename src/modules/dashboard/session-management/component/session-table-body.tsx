import { TableBody } from "@mui/material";
import React from "react";
import { SessionTableBodyProps } from "@/modules/dashboard/session-management/types/session-table-body-props";
import SessionRowContainer from "@/modules/dashboard/session-management/container/session-row-container";

export default function SessionTableBody({
  sessions,
  handleOpenModal,
}: SessionTableBodyProps) {
  return (
    <TableBody>
      {sessions.map((session, index) => (
        <React.Fragment key={session.id}>
          <SessionRowContainer
            session={session}
            index={index}
            handleOpenModal={handleOpenModal}
          />
        </React.Fragment>
      ))}
    </TableBody>
  );
}
