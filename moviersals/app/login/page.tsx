"use client"

import LoginForm from "@/components/Form/loginForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";

export default function LoginPage() {
  return (
    <Transition>
      <div>
        <h1 className={title()}>Chào mừng đến với <b>Moviersals</b></h1>
        <LoginForm />
      </div>
    </Transition>
  );
}
