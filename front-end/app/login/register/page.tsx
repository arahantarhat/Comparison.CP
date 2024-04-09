"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";

import PocketBase from 'pocketbase';

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
import { type } from "os";
import { TypographyH1 } from "@/app/components/Text";

const pb = new PocketBase('http://127.0.0.1:8090');

// registration form
const registrationFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message:
      "Invalid email address. Email must contain @ symbol and domain (e.g. .com).",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  codeforces_handle: z.string().min(2, {
    message: "Codeforces handle must be at least 2 characters.",
  }),
});

// 2. Define a submit handler.
async function onSubmitReg(values: z.infer<typeof registrationFormSchema>) {
  try {
    const data = {
      "username": `${values.username}`,
      "email": `${values.email}`,
      "emailVisibility": true,
      "password": `${values.password}`,
      "passwordConfirm": `${values.password}`,
      "group": "",
      "codeforcesID": `${values.codeforces_handle}`
    };
    const record = await pb.collection('users').create(data);
    console.log('User created successfully! ', record);
  } catch(error){
    console.error('Error creating user: ', error);
  }
}

function register() {
  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      codeforces_handle: "",
    },
  });

  return (
    <div className="py-40 w-screen">
      <div className="w-5/12 mx-auto">
        <div className="py-5 mx-auto">
          <TypographyH1>Register</TypographyH1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitReg)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="bruh@email.bruh" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your e-mail address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <div>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This is your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField 
              control={form.control}
              name="codeforces_handle"
              render={({ field }) => (
                  <div>
                    <FormItem>
                      <FormLabel>Codeforces Handle</FormLabel>
                      <FormControl>
                        <Input placeholder="dork777" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your codeforces handle.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
            />
            <Button type="submit">
              <a href="/login">Submit</a>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function ProfileFormReg() {
  return register();
}
