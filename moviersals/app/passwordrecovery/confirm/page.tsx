import PasswordRecoveryForm from "@/components/Form/passwordRecoveryForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";

export default function PasswordRecoveryPage() {
  return (
    <Transition>
      <div className="my-2">
        <PasswordRecoveryForm />
      </div>
    </Transition>
  );
}
