"use client";

import FallbackDetail from "@/components/Fallback/fallbackDetail";
import LoginForm from "@/components/Form/loginForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Transition>
      <Suspense fallback={<FallbackDetail />}>
        <div>
          <h1 className={title()}>
            Chào mừng đến với <b>Moviersals</b>
          </h1>
          <LoginForm />
        </div>
      </Suspense>
    </Transition>
  );
}
