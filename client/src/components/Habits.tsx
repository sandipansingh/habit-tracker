import { Spinner } from "@/components/ui/spinner";
import type { Habit } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteHabit, fetchHabits } from "@/api/habits";

function Habits() {
  const [data, setData] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHabits = async () => {
      try {
        setLoading(true);
        setError("");
        const habits = await fetchHabits();
        setData(habits);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load habits");
        toast.error("Failed to load habits");
      } finally {
        setLoading(false);
      }
    };

    void loadHabits();
  }, []);

  async function handleDelete(id: number) {
    const previousData = data;
    setData((prev) => prev.filter((habit) => habit.id !== id));
    setDeletingIds((prev) => [...prev, id]);

    try {
      await deleteHabit(id);
      toast.success("Habit deleted successfully");
    } catch {
      setData(previousData);
      toast.error("Failed to delete habit. Please try again.");
    } finally {
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id));
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center p-6">
        <Spinner className="h-8 w-8 text-blue-500" />
        <span className="ml-3 text-gray-600">Loading your habits...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-3xl border-4 border-red-600 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <h1 className="mb-8 inline-block border-b-4 border-black text-3xl font-black uppercase tracking-tighter sm:text-4xl">
        My Habits
      </h1>

      <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 ? (
          data.map((habit, index) => (
            <div
              key={habit.id}
              className={`flex aspect-square flex-col border-4 border-black bg-white p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                index % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
              }`}
            >
              <div className="flex-1">
                <h3 className="break-words text-xl font-black uppercase tracking-tight sm:text-2xl">
                  {habit.name}
                </h3>
                {habit.description ? (
                  <p className="mt-2 line-clamp-3 font-mono text-sm text-black/70">
                    {habit.description}
                  </p>
                ) : null}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  className="border-4 border-black bg-pink-500 px-4 py-2 text-sm font-bold uppercase text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 hover:bg-pink-600 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:translate-x-0 disabled:opacity-50 disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  onClick={() => void handleDelete(habit.id)}
                  disabled={deletingIds.includes(habit.id)}
                  aria-label={`Delete habit ${habit.name}`}
                >
                  {deletingIds.includes(habit.id) ? "⌛" : "✖"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center border-4 border-black bg-white p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xl font-bold text-black/70">No habits yet. Create your first one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Habits;
