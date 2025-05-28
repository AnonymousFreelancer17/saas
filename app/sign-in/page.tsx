"use client";

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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { z } from "zod";

// Zod Schema
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted:", data);
  }

  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <Card className="lg:w-[30vw] md:w-[50vw] w-[80vw] flex flex-col justify-start items-center px-4 py-[40px]">
        <CardHeader className="w-full h-[80px]  flex flex-col justify-center items-center">
          <div className="h-[30px] flex justify-center items-center">LOGO</div>
          <CardTitle className="text-2xl">Sign In to Gitti</CardTitle>
          <CardDescription className="font-light text-md">
            Welcome back! Please sign-in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center">
            <Button className="w-full rounded-[5px] h-[40px] cursor-pointer">
              <FaGoogle />
              Google
            </Button>

            {/*  add more options in the future if required */}
          </div>

          <div className="my-4">Or</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-[0px] h-[40px] outline-0"
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
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
                        placeholder="*****"
                        {...field}
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
          <div
            className="w-full flex justify-center items-center my-2
          "
          >
            <p> Don`t have an account?</p>
            <Link href={"/sign-up"} className="ms-2 text-blue-500">
              Create an account
            </Link>
          </div>
        </CardContent>
        <CardFooter className="w-full h-[60px] flex flex-col justify-center items-center border-t">
          <div>Logo</div>
          <div className="font-light text-xs">
            One Account for Gitti,Loha,Tina and
            <Link href={"/"} className="text-blue-500 ms-2">
              more
            </Link>
          </div>

          <div className="font-light text-xs text-center">
            This site is protected by reCAPTCHA and the Google
            <Link href={""} className="text-blue-500 ms-1">
              Privacy Policy
            </Link>{" "}
            and
            <Link href={""} className="text-blue-500 ms-1">
              Terms of Service
            </Link>{" "}
            apply.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default InputForm;
