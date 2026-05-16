import { Popover } from "@base-ui/react/popover";
import { useState } from "react";
import { toast } from "sonner";
import { createHabit } from "@/api/habits";
import { habitFormSchema } from "@/lib/forms";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="w-full max-w-2xl">
        <div className="border-4 border-black bg-yellow-300 p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-yellow-600">
          <div className="mb-2 flex items-center gap-2 text-4xl font-black uppercase tracking-tighter text-black dark:text-white">
            ✏️ Habit Tracker
          </div>
          <p className="mb-8 text-xl font-bold text-black/80">Build better habits, one day at a time.</p>

          <Popover.Root>
            <Popover.Trigger className="border-4 border-black bg-lime-400 px-6 py-3 font-bold text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:bg-lime-600 dark:text-white">
              Create Habit +
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Positioner sideOffset={16}>
                <Popover.Popup className="w-[90vw] max-w-md -rotate-1 border-4 border-black bg-white p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <Popover.Title className="mb-4 flex items-center gap-2 text-3xl uppercase text-black">
                    <span>➕</span> Create Habit
                  </Popover.Title>
                  <Form />
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </div>
  );
}

function Form() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = habitFormSchema.safeParse({ name, description });

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Please check your input";
      toast.error(message);
      return;
    }

    setIsSubmitting(true);

    try {
      await createHabit(parsed.data);
      toast.success("Habit added");
      setName("");
      setDescription("");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to add habit. Try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="habit-name" className="font-bold uppercase text-sm">
          Habit Name *
        </Label>
        <Input
          id="habit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Gym, Study, Meditate"
          className="rounded-none border-2 border-black bg-white p-2 focus:outline-none focus:ring-2 focus:ring-black"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="habit-description" className="font-bold uppercase text-sm">
          Description
        </Label>
        <Textarea
          id="habit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why this habit? Any notes?"
          className="rounded-none border-2 border-black bg-white p-2 focus:outline-none focus:ring-2 focus:ring-black"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full border-4 border-black bg-cyan-400 py-3 font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:translate-x-0 disabled:opacity-50 disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        {isSubmitting ? "Saving..." : "Save Habit"}
      </Button>
    </form>
  );
}

export default Home;
