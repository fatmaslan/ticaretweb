"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const formSchema = z
  .object({
    username: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
    email: z.string().email("Geçerli bir e-posta adresi girin."),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
    passwordConfirm: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordConfirm"],
  });

const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-16">
      <div className=" p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-center font-bold text-2xl text-red-900 mb-6">
          Üye Ol
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanici Adiniz</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-300 w-full h-10 rounded-2xl px-3"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Hesabiniz</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-300 w-full h-10 rounded-2xl px-3"
                      placeholder="text12@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifrenizi Giriniz</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-300 w-full h-10 rounded-2xl px-3"
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifrenizi Tekrar Giriniz</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-300 w-full h-10 rounded-2xl px-3"
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="myButton" type="submit" className="w-full">
              Üye Ol
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Label className="block">Zaten bir hesabiniz var mi?</Label>
          <Link href="/login" className="text-slate-500 mt-2 block">
            Tiklayip giriş yapabilirsiniz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
