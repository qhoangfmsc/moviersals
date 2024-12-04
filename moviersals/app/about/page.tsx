import Transition from "@/components/MotionFramer/transition";
import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <Transition>
      <div>
        <h1 className={title()}>Về chúng tôi</h1>
      </div>
    </Transition>
  );
}
