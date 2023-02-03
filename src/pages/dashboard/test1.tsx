import { DashboardPageLayout } from "./";

function Test1() {
  return (
    <div>
      Test1
    </div>
  );
}

Test1.getLayout = DashboardPageLayout;

export default Test1;