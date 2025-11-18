import Sidebar from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "240px", width: "100%" }}>
        <DashboardContent />
      </div>
    </div>
  );
}
