import RequestPasswordRecoveryForm from "@/components/Form/requestPasswordRecoveryForm";
import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";

export default function RequestPasswordRecoveryPage() {
  return (
    <Transition>
      <div className="flex flex-col items-center justify-center">
        <div className="lg:mb-10">
          <h1 className={title()}>Đặt lại mật khẩu bằng email</h1>
        </div>
        <div className="my-2">
          <RequestPasswordRecoveryForm />
        </div>
      </div>
    </Transition>
  );
}
