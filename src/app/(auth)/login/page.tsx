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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(6,"Kullanici adi en az 6 karakter olmalidir."),
  password: z.string().min(6, "Şifre en az 6 karakter olmalidir."),
});

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);
  
  useEffect(() => {
    const user = localStorage.getItem("accessToken");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.error || "Giriş başarisiz. Lütfen bilgilerinizi kontrol ediniz.");
      }


      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      setIsAuthenticated(true);

      router.push("/");
    } catch (error:unknown) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-24 flex flex-col items-center justify-center ">
      <div className="p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="font-bold text-2xl text-red-900 mb-6 text-center">
          Üye olmak için
        </h1>

        {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanici Adiniz</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-300 w-full pl-3 pr-10 h-10 rounded-2xl"
                      placeholder="shdnsss"
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
            <Button variant="myButton" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                <Loader2 size={20} className="animate-spin"/>
                Giriş yapiliyor...
                </>
              ) : (
                <>Giriş Yap</>
              )}
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
