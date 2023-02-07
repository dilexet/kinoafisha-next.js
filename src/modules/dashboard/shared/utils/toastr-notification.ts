import {
  ActionSuccessMessages,
  ActionErrorMessages,
} from "@/modules/dashboard/shared/enums/action-messages";
import ActionStatuses from "@/modules/dashboard/shared/enums/action-statuses";
import { toastr } from "react-redux-toastr";

const toastrNotification = (
  title: string,
  action: ActionSuccessMessages | ActionErrorMessages,
  status: ActionStatuses,
) => {
  if (status === ActionStatuses.SUCCESS) {
    toastr.success(title, action.toString());
  }
  if (status === ActionStatuses.ERROR) {
    toastr.error(title, action.toString());
  }
};

export default toastrNotification;
