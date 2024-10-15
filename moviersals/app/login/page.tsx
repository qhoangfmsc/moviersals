"use client"

import LoginForm from "@/components/Form/loginForm";
import { title } from "@/components/primitives";

export default function LoginPage() {
  return (
    <div>
      <h1 className={title()}>Chào mừng đến với <b>Moviersals</b></h1>
      <LoginForm />
    </div>
  );
}
