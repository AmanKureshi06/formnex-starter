"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useRef, useTransition } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { submitWaitlistForm } from "./action";
import { formSchema } from "./schema";

type FormValues = z.infer<typeof formSchema>;
type FormState = { message: string };

export function WaitlistForm() {
  const [state, setState] = useState<FormState>({ message: "" });
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const formData = new FormData(formRef.current!);
      const result = await submitWaitlistForm(state, formData);
      setState(result);
      form.reset();
    });
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Join the Waitlist</h2>
        <p className="text-muted-foreground">
          Be the first to know when we launch.
        </p>
        {state.message && (
          <div className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            {state.message}
          </div>
        )}
      </div>

      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Your email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending..." : "Join the Waitlist"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
