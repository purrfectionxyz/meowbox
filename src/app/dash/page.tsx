import { AuthButtons } from "~/components/auth/auth-buttons";
import DrawBoxWrapper from "~/components/drawbox-wrapper";

export default async function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <AuthButtons />

      <div className="border border-black">
        <DrawBoxWrapper />
      </div>
    </div>
  );
}
