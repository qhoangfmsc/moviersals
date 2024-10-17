"use client"

import RegisterForm from "@/components/Form/registerForm";
import { title } from "@/components/primitives";

export default function LoginPage() {
  return (
    <div>
      <h1 className={title()}>Đăng ký thẻ hội viên <b>Moviersals</b></h1>
      <div className="my-4">
        <RegisterForm />
      </div>
    </div>
  );
}
