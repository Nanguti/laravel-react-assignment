import { useEffect } from "react";
import Menu from "../components/Menu/Menu";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return <Menu />;
};

export default Dashboard;
