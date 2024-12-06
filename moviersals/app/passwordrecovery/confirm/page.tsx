import FallbackDetail from "@/components/Fallback/fallbackDetail";
import PasswordRecoveryForm from "@/components/Form/passwordRecoveryForm";
import Transition from "@/components/MotionFramer/transition";
import { Suspense } from "react";

export default function PasswordRecoveryPage() {
  return (
    <Transition>
      <Suspense fallback={<FallbackDetail />}>
        <PasswordRecoveryForm />
      </Suspense>
    </Transition>
  );
}
