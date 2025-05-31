"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import { useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";

// Sign up form schema
const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Verification code schema
const VerifySchema = z.object({
  code: z.string().min(6, {
    message: "Please enter the 6-digit code sent to your email.",
  }),
});

function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const signUpForm = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const verifyForm = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      code: "",
    },
  });

  // Sign up submit handler
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      signUpForm.setError("email", {
        message: err?.errors?.[0]?.message || "Failed to sign up.",
      });
    }
  }

  // Verify code handler
  const handleVerify = async (data: z.infer<typeof VerifySchema>) => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Incomplete signup:", completeSignUp);
      }
    } catch (err: any) {
      verifyForm.setError("code", {
        message: err?.errors?.[0]?.message || "Invalid verification code.",
      });
    }
  };

  // Google sign-up
  async function signUpWithGoogle() {
    if (!isLoaded) return;
    await signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/dashboard",
      redirectUrlComplete: "/dashboard",
    });
  }

  // Verification UI
  if (verifying) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center mt-[100px]">
        <Card className="lg:w-[30vw] md:w-[50vw] w-[80vw] px-4 py-[40px]">
          <CardHeader>
            <CardTitle className="text-2xl">Verify your email</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...verifyForm}>
              <form
                onSubmit={verifyForm.handleSubmit(handleVerify)}
                className="w-full space-y-4"
              >
                <FormField
                  control={verifyForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-[0px] h-[40px]"
                          placeholder="123456"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full cursor-pointer">
                  Verify
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sign-up UI
  return (
    <div className="min-h-screen w-full flex justify-center items-center mt-[40px]">
      <Card className="lg:w-[30vw] md:w-[50vw] w-[80vw] px-4 py-[40px]">
        <CardHeader className="text-center">
          <div className="h-[30px]">LOGO</div>
          <CardTitle className="text-2xl">Sign Up on Gitti</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="w-full mb-4">
            <Button
              type="button"
              className="w-full rounded-[5px] h-[40px] flex gap-2 cursor-pointer"
              onClick={signUpWithGoogle}
            >
              <FaGoogle />
              Sign up with Google
            </Button>
          </div>

          <div className="text-sm text-center mb-4 font-bold">Or</div>

          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-[0px] h-[40px]"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="rounded-[0px] h-[40px]"
                        placeholder="••••••"
                        ref={(el) => {
                          field.ref(el);
                          passwordInput.current = el;
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-end items-center">
                View Password
                <Switch
                  checked={showPassword}
                  onCheckedChange={setShowPassword}
                  className="ms-2"
                />
              </div>

              <div className="text-xs text-muted-foreground">
                By signing up, you agree to our{" "}
                <Link href="#" className="text-blue-500 underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-500 underline">
                  Privacy Policy
                </Link>
                .
              </div>

              <div id="clerk-captcha" />

              <Button
                type="submit"
                className="w-full rounded-[5px] h-[40px] cursor-pointer"
              >
                Sign Up
              </Button>
            </form>
          </Form>

          <div className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-blue-500 underline cursor-pointer"
            >
              Sign In
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center border-t pt-4 text-xs">
          <div>LOGO</div>
          <p>
            One account for Gitti, Loha, Tina, and{" "}
            <Link href="/" className="text-blue-500">
              more
            </Link>
          </p>
          <p className="text-center">
            This site is protected by reCAPTCHA and the Google{" "}
            <Link href="#" className="text-blue-500 cursor-pointer">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-blue-500 cursor-pointer">
              Terms of Service
            </Link>{" "}
            apply.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
