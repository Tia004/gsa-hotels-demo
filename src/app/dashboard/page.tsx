import { auth, currentUser } from "@clerk/nextjs/server";
import { turso } from "@/lib/turso";
import { redirect } from "next/navigation";
import DashboardFree from "@/components/DashboardFree";
import DashboardStandard from "@/components/DashboardStandard";
import DashboardGold from "@/components/DashboardGold";

export default async function DashboardPage() {
  const session = await auth();
  const { userId } = session;
  
  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const userName = user?.firstName ? `${user.firstName} ${user.lastName || ''}` : "Ospite";

  let tier = 'free';
  try {
    const result = await turso.execute({
      sql: "SELECT tier FROM users WHERE clerk_id = ?",
      args: [userId]
    });
    if (result.rows.length > 0) {
      tier = result.rows[0].tier as string;
    }
  } catch (error) {
    console.error("Turso error (table might not exist yet):", error);
  }

  if (tier === 'gold') {
    return <DashboardGold userName={userName} />;
  }
  
  if (tier === 'standard') {
    return <DashboardStandard userName={userName} />;
  }

  return <DashboardFree userName={userName} />;
}
