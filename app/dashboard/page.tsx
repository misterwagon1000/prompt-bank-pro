import { currentUser } from "@clerk/nextjs/server";
import PromptExpander from "@/components/PromptExpander";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return <div className="p-10 text-center">Please sign in.</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">
          Create Your Perfect Prompt
        </h2>
        <p className="text-xl text-gray-600">
          Transform any idea into a professional AI prompt in seconds
        </p>
      </div>

      <PromptExpander />
    </main>
  );
}