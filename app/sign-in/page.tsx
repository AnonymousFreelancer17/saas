"use client";

import { useSignIn } from "@clerk/nextjs";
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
  FormDescription,
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

const FormSchema = z.object({
  userEmail: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userEmail: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: data.userEmail,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard"); // Redirect after login
      } else {
        console.log("Additional steps required", result);
      }
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "errors" in err &&
        Array.isArray((err as any).errors)
      ) {
        console.error("Sign-in error:", (err as any).errors);
        form.setError("userEmail", {
          message: (err as any).errors?.[0]?.message || "Failed to sign in.",
        });
      } else {
        console.error("Sign-in error:", err);
        form.setError("userEmail", {
          message: "Failed to sign in.",
        });
      }
    }
  }

  async function signInWithGoogle() {
    if (!isLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/dashboard",
      redirectUrlComplete: "/dashboard",
    });
  }

  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <Card className="lg:w-[30vw] md:w-[50vw] w-[80vw] flex flex-col justify-start items-center px-4 py-[40px]">
        <CardHeader className="w-full flex flex-col justify-center items-center">
          <div className="h-[30px] flex justify-center items-center">LOGO</div>
          <CardTitle className="text-2xl">Sign In to Gitti</CardTitle>
          <CardDescription className="font-light text-md">
            Welcome back! Please sign-in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center">
            <Button
              className="w-full rounded-[5px] h-[40px] cursor-pointer flex gap-2"
              onClick={signInWithGoogle}
            >
              <FaGoogle />
              Sign in with Google
            </Button>
          </div>

          <div className="my-4">Or</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-[0px] h-[40px] outline-0"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your sign-in email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="rounded-[0px] h-[40px] outline-0"
                        placeholder="••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your password securely here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full cursor-pointer rounded-[5px] h-[40px]"
              >
                Submit
              </Button>
            </form>
          </Form>
          <div className="w-full flex justify-center items-center my-2">
            <p>Don’t have an account?</p>
            <Link href={"/sign-up"} className="ms-2 text-blue-500">
              Create an account
            </Link>
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col justify-center items-center border-t">
          <div>Logo</div>
          <div className="font-light text-xs">
            One Account for Gitti, Loha, Tina and
            <Link href={"/"} className="text-blue-500 ms-2">
              more
            </Link>
          </div>
          <div className="font-light text-xs text-center">
            This site is protected by reCAPTCHA and the Google
            <Link href="#" className="text-blue-500 ms-1">
              Privacy Policy
            </Link>{" "}
            and
            <Link href="#" className="text-blue-500 ms-1">
              Terms of Service
            </Link>{" "}
            apply.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
