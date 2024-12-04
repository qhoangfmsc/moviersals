"use client"

import RegisterFlipCard from "@/components/Card/registerFlipCard";
import RegisterForm from "@/components/Form/registerForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";

export default function LoginPage() {
  return (
    <Transition>
      <div className="lg:mb-10">
        <h1 className={title()}>Đăng ký thẻ hội viên <b>Moviersals</b></h1>
      </div>
      <div className="my-2">
        <RegisterFlipCard />
        <RegisterForm />
      </div>
    </Transition>
  );
}
