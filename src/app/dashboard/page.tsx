import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SuppliersDashboard from "@/components/SuppliersDashboard";

export default async function DashboardPage() {
  const session = await auth();
  const { userId } = session;
  
  if (!userId) {
    redirect("/login");
  }

  const user = await currentUser();
  const userName = user?.firstName ? `${user.firstName} ${user.lastName || ''}` : "Ospite";

  /* 
     Unified GSA Network Portal 
     All certified partners now share a single, high-end directory of suppliers.
  */
  return <SuppliersDashboard userName={userName} />;
}
