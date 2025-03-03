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

const formSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center ">
      <div className=" p-8 rounded-lg shadow-2xl w-full max-w-md">
      <h1 className="font-bold text-2xl text-red-900 mb-6 text-center">
        Üye olmak için
      </h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email hesabiniz</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-300 w-full pl-3 pr-10 h-10 rounded-2xl"
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
                <FormLabel>Şifrenizi giriniz</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-300 w-full pl-3 pr-10 h-10 rounded-2xl"
                    type="password"
                    placeholder="****"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="myButton" type="submit">
            Giriş yap
          </Button>
        </form>
      </Form>
      <div className="mt-8 text-center">
        <Label className="block">Bir hesabiniz yok mu?</Label>
        <Link href="/register" className="mt-2 text-slate-500 block">
          Yeni hesap oluşturmak için tiklayin.
        </Link>
      </div>
    </div>
    </div>
  
  );
};

export default LoginPage;
