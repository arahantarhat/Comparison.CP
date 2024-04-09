"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";

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
import { TypographyH1 } from "../components/Text";
import { type } from "os";
import PocketBase from 'pocketbase';
import { onSubmitLogClient, loginFormSchema } from "../actions";


function login() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="py-40 w-screen">
      <div className="w-5/12 mx-auto">
        <div className="py-5 mx-auto">
          <TypographyH1>Log-In</TypographyH1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitLogClient)} className="space-y-2">
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
              name="password"
              render={({ field }) => (
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
              )}
            />
            <Button type="submit">
              <a href="/">Submit</a>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function ProfileForm() {
  return login();
}
