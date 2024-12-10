import Image from "next/image";
import ModalNextUI from "./Modal/modalNextUi";
import { HeartFilledIcon } from "./icons";
import { toast } from "react-toastify";

export const Footer = () => {
  return (
    <footer
      className="w-full flex flex-col items-center justify-center p-4 border-t-1 z-10 bg-darken"
      style={{
        borderTopLeftRadius: "50px",
        borderTopRightRadius: "50px",
      }}>
      <div className="container mx-10 mt-2 mb-8 p-8">
        <div className="w-full flex flex-row">
          <div className="basis-4/5">
            <Image
              width={70}
              height={70}
              alt="MoviersalsLogo"
              src="/image/MoviersalsLogo.jpg"
            />
          </div>
          <div className="basis-1/5">
            <ModalNextUI
              title="Ủng hộ chúng tôi"
              body={
                <>
                  <div className="flex justify-center">
                    <Image
                      width={200}
                      height={70}
                      alt="QRCode"
                      src="/image/sacombankPay.jpg"
                    />
                  </div>
                  <p>Cảm ơn vì trải nghiệm của bạn. Ủng hộ chúng tôi thông qua Sacombank Pay.</p>
                </>
              }
              optionalButton={{
                activeButtonIcon: <HeartFilledIcon className="text-default-800" />,
                activeButtonText: "Ủng hộ chúng tôi",
                cancelButtonText: "",
                confirmButtonText: "",
              }}
            />
          </div>
        </div>
        <br />
        <div className="w-full lg:flex lg:flex-row">
          <div className="basis-4/5 transition-all">
            <p>Địa chỉ: 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.Hồ Chí Minh</p>
            <p>Email: support@moviersals.vn</p>
            <p>Hotline: +84 123 456 789 (Miễn phí)</p>
          </div>
          <div className="basis-1/5 transition-all flex flex-row justify-around pt-4">
            <div className="cursor-pointer">
              <Image
                width={150}
                height={1}
                alt="chplay"
                src="/image/downloadChplay.png"
                onClick={() => { toast("Ứng dụng trên CH Play đang trong quá trình thử nghiệm. Cảm ơn quý khách đã quan tâm!") }}
              />
            </div>
            <div className="cursor-pointer">
              <Image
                width={135}
                height={1}
                alt="ios"
                src="/image/downloadIos.png"
                onClick={() => { toast("Ứng dụng trên App Store đang trong quá trình thử nghiệm. Cảm ơn quý khách đã quan tâm!") }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
