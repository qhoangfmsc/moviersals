"use client";

import RequestPasswordRecoveryForm from "@/components/Form/requestPasswordRecoveryForm";
import { title } from "@/components/primitives";

export default function RequestPasswordRecoveryPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="lg:mb-10">
        <h1 className={title()}>Reset mật khẩu bằng email</h1>
      </div>
      <div className="my-2">
        <RequestPasswordRecoveryForm />
      </div>
    </div>
  );
}
