import PasswordRecoveryForm from "@/components/Form/passwordRecoveryForm";
import { title } from "@/components/primitives";

export default function PasswordRecoveryPage() {
  return (
    <>
      {/* <div className="lg:mb-10">
        <h1 className={title()}>Reset mật khẩu bằng email</h1>
      </div> */}

      <div className="my-2">
        <PasswordRecoveryForm />
      </div>
    </>
  );
}
