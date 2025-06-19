"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OtpModal from "@/components/OTPModal";
import { createAccount, signInUser } from "@/lib/actions/users.actions";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) =>
  z.object({
    email: z.string().email("Please enter a valid email address."),
    fullName:
      formType === "sign-up"
        ? z
            .string()
            .min(2, "Name must be at least 2 characters.")
            .max(50, "Name must be under 50 characters.")
        : z.string().optional(),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });

      setAccountId(user.accountId);
    } catch {
      setErrorMessage("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full max-w-md bg-white/5 border border-white/20 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.4)] transition-all duration-300"
        >
          {/* Title */}
          <h1 className="text-white text-4xl font-extrabold text-center tracking-tight leading-tight">
            {type === "sign-in" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-white/70 text-center text-sm">
            {type === "sign-in"
              ? "Access your cloud workspace"
              : "Start organizing your digital world"}
          </p>

          {/* Full Name (only for sign-up) */}
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your full name"
                      className="bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />
          )}

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    className="bg-white/10 border border-white/30 text-white placeholder-white/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-sm" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand hover:bg-brand/90 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loading..."
                width={20}
                height={20}
                className="animate-spin"
              />
            )}
          </Button>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-400 text-sm text-center mt-2">
              *{errorMessage}
            </p>
          )}

          {/* Switch Link */}
          <div className="text-white text-center text-sm mt-3">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-brand font-semibold hover:underline ml-1"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

      {/* OTP Modal */}
      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;
