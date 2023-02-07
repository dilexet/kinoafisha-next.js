import moment from "moment";
import SessionCreateTimesComponent from "@/modules/dashboard/session-management/component/session-create-times-component";

export default function SessionCreateTimesContainer({
  values,
  setFieldValue,
  errors,
}) {
  const handleAddNumberOfSessions = () => {
    const sessionTimes = values?.sessionTimes;
    sessionTimes.push({
      startDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      coefficient: 1,
    });
    setFieldValue("sessionTimes", sessionTimes);
  };

  const handleRemoveNumberOfSessions = () => {
    const sessionTimes = values?.sessionTimes;
    sessionTimes.pop();
    setFieldValue("sessionTimes", sessionTimes);
  };

  const handleChangeDate = (event, index) => {
    values.sessionTimes[index].startDate = event.target.value;
    setFieldValue("sessionTimes", values.sessionTimes);
  };

  const handleChangeCoefficient = (event, index) => {
    values.sessionTimes[index].coefficient =
      event.target.value == "" ? event.target.value : +event.target.value;
    setFieldValue("sessionTimes", values.sessionTimes);
  };

  return (
    <SessionCreateTimesComponent
      sessionTimes={values?.sessionTimes}
      handleAddNumberOfSessions={handleAddNumberOfSessions}
      handleRemoveNumberOfSessions={handleRemoveNumberOfSessions}
      errors={errors}
      handleChangeCoefficient={handleChangeCoefficient}
      handleChangeDate={handleChangeDate}
    />
  );
}
