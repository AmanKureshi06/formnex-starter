"use server";

import { formSchema } from "./schema";

type FormState = {
  message: string;
};

export async function submitContactForm(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "Invalid form data" };
  }

  try {
    const response = await fetch(
      `${process.env.FORMNEX_ENDPOINT_URL}`, // Ensure this is set in your environment
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FORMNEX_API_KEY_CONTACT}`, // Ensure this is set in your environment
        },
        body: JSON.stringify(parsed.data),
      }
    );

    if (!response.ok) {
      return { message: "Failed to submit form" };
    }

    return { message: "Message sent successfully!" };
  } catch (error) {
    return { message: "Failed to submit form. Please try again." };
  }
}
