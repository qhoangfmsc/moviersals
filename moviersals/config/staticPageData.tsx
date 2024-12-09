import Image from "next/image";

export const staticPageData = [
  {
    id: "aboutus",
    title: "VỀ CHÚNG TÔI",
    body: (
      <div className="flex flex-col">
        <div>
          Chào mừng bạn đến với Moviersal, nền tảng xem phim trực tuyến hiện đại, nơi mang đến trải nghiệm giải trí trọn vẹn ngay tại nhà.
        </div>
        <br />
        <div>
          Moviersal ra đời với mong muốn kết nối mọi người qua những bộ phim hay, chương trình hấp dẫn. Chúng tôi mang đến không gian giải
          trí tiện lợi, hiện đại, giúp bạn thưởng thức nội dung yêu thích bất cứ lúc nào, ở bất kỳ đâu.
        </div>
        <br />
        <div>
          Dù bạn là người yêu phim hành động, hài hước hay những bộ phim cảm động, Moviersal đều có nội dung phù hợp với mọi sở thích.
        </div>
        <br />
        <div className="flex flex-col">
          Điều Chúng Tôi Mang Lại:
          <div className="font-thin">• Kho phim đa dạng.</div>
          <div className="font-thin">• Giao diện thân thiện, dễ sử dụng.</div>
          <div className="font-thin">• Chất lượng video cao cấp, mượt mà trên mọi thiết bị.</div>
        </div>
        <br />
        <br />

        <div className="text-xl">Hãy để Moviersal đồng hành cùng bạn trong mọi khoảnh khắc giải trí!</div>
      </div>
    ),
  },
  {
    id: "chinhsachbaomat",
    title: "CHÍNH SÁCH BẢO MẬT",
    body: (
      <div>
        <div>
          Cảm ơn bạn đã truy cập vào website{" "}
          <a
            className="text-primary"
            href="https://moviersals.vercel.app/"
            target="_blank">
            https://moviersals.vercel.app/
          </a>{" "}
          của Chúng tôi (sau đây gọi tắt là "Website").{" "}
        </div>
        <br />
        <div>
          Chính sách bảo mật này công bố cách thức mà Công ty Moviersals thu thập, lưu trữ và xử lý thông tin hoặc dữ liệu cá nhân của bạn
          thông qua Website. Khi sử dụng Website của chúng tôi, bạn thừa nhận rằng bạn đồng ý với các điều khoản và điều kiện trong Chính
          sách bảo mật của chúng tôi.
        </div>
        <br />
        <div>
          Xin vui lòng đọc bản Quy định chính sách bảo mật dưới đây để hiểu hơn những cam kết mà chúng tôi thực hiện nhằm tôn trọng và bảo
          vệ quyền lợi của người truy cập. Chính Sách Bảo Mật Thông Tin Cá Nhân này bao gồm các nội dung:
        </div>
        <br />
        <div className="font-thin">1. Sự Chấp Thuận</div>
        <div className="font-thin">2. Mục Đích Thu Thập</div>
        <div className="font-thin">3. Phạm Vi Thu Thập</div>
        <div className="font-thin">4. Thời Gian Lưu Trữ</div>
        <div className="font-thin">5. Không Chia Sẻ Thông Tin Cá Nhân Khách Hàng</div>
        <div className="font-thin">6. An Toàn Dữ Liệu</div>
        <div className="font-thin">7. Quyền Của Khách Hàng Đối Với Thông Tin Cá Nhân</div>
        <div className="font-thin">8. Thông Tin Liên Hệ</div>
        <div className="font-thin">9. Đơn Vị Thu Thập và Quản Lý Thông Tin</div>
        <div className="font-thin">10. Hiệu Lực</div>
        <br />
        <div className="text-xl">1. Sự Chấp Thuận</div>
        <div className="font-thin">
          Bằng việc trao cho chúng tôi thông tin cá nhân của bạn, sử dụng Website bạn đồng ý thông tin cá nhân của bạn sẽ được thu thập, sử
          dụng như được nêu trong Chính Sách này. Nếu bạn không đồng ý với Chính Sách này, bạn dừng cung cấp cho chúng tôi bất cứ thông tin
          cá nhân nào và/hoặc sử dụng các quyền như được nêu tại Mục 7 dưới đây.
        </div>
        <br />
        <div className="font-thin">
          Chúng tôi bảo lưu quyền sửa đổi, bổ sung nhằm hoàn thiện đối với Chính Sách này vào bất kỳ thời điểm nào. Chúng tôi khuyến khích
          bạn thường xuyên xem lại Chính Sách Bảo Mật Thông Tin Cá Nhân này để có được những cập nhật mới nhất đảm bảo bạn biết và thực hiện
          quyền quản lý thông tin cá nhân của bạn.
        </div>
        <br />
        <div className="text-xl">2. Mục Đích Thu Thập</div>
        <div className="font-thin">Chúng tôi thu thập thông tin cá nhân chỉ cần thiết nhằm phục vụ cho các mục đích: </div>
        <br />
        <div className="font-thin">∙ Đơn Hàng: để xử lý các vấn đề liên quan đến đơn đặt hàng của bạn;</div>
        <br />
        <div className="font-thin">∙ Duy Trì Tài Khoản: để tạo và duy trì tài khoản của bạn với chúng tôi;</div>
        <br />
        <div className="font-thin">
          ∙ Dịch Vụ Chăm Sóc Khách Hàng: Chúng tôi sử dụng thông tin để đảm bảo rằng bạn có thể sử dụng Website của chúng tôi theo cách hiệu
          quả nhất và đảm bảo rằng bạn nhận được thông tin liên quan, dịch vụ hỗ trợ nếu được yêu cầu và thông báo về những thay đổi đối với
          dịch vụ của chúng tôi.
        </div>
        <br />
        <div className="text-xl">3. Phạm Vi Thu Thập</div>
        <div className="font-thin">Chúng tôi thu thập thông tin cá nhân của bạn khi:</div>
        <div className="font-thin">∙ Bạn trực tiếp cung cấp cho chúng tôi.</div>
        <br />
        <div className="font-thin">
          Đó là các thông tin cá nhân bạn cung cấp cho chúng tôi được thực hiện trên Website bao gồm: họ tên, địa chỉ thư điện tử (email),
          thông tin đăng nhập tài khoản bao gồm thông tin bất kỳ cần thiết để thiết lập tài khoản ví dụ như tên đăng nhập, mật khẩu đăng
          nhập.{" "}
        </div>
        <div className="font-thin">∙ Bạn tương tác với chúng tôi. </div>
        <br />
        <div className="font-thin">
          Website có thể sử dụng Cookies, một công nghệ lưu trữ thông tin như nhật ký sử dụng trên máy tính của người truy cập nhằm tạo điều
          kiện sử dụng các trang web tiện lợi hơn. Cookies sẽ lưu lại trạng thái trong lần truy cập cuối cùng của bạn tại máy tính truy cập
          nhằm mục đích trả lại trạng thái này cho bạn khi truy cập lần sau. Tuy nhiên, bằng cách thay đổi cài đặt trên trình duyệt
          Internet, bạn có thể tắt cookies hoặc cài đặt cookies sao cho một cảnh báo sẽ xuất hiện trên màn hình máy tính trước khi cookies
          được cấp.{" "}
        </div>
        <br />
        <div className="text-xl">4. Thời Gian Lưu Trữ</div>
        <div className="font-thin">
          Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu ban quản trị hủy bỏ. Còn lại trong mọi trường hợp thông tin
          cá nhân khách hàng sẽ được bảo mật trên máy chủ của công ty.
        </div>
        <br />
        <div className="text-xl">5. Không Chia Sẻ Thông Tin Cá Nhân Khách Hàng</div>
        <div className="font-thin">
          Chúng tôi sẽ không cung cấp thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào, trừ một số hoạt động cần thiết dưới đây:
        </div>
        <div className="font-thin">
          ∙ Các đối tác là bên cung cấp dịch vụ cho chúng tôi liên quan đến thực hiện đơn hàng và chỉ giới hạn trong phạm vi thông tin cần
          thiết cũng như áp dụng các quy định đảm bảo an ninh, bảo mật các thông tin cá nhân.
        </div>
        <div className="font-thin">
          ∙ Chúng tôi có thể cung cấp các thông tin cá nhân thu thập từ bạn cho bên thứ ba có liên quan trong quá trình chúng tôi thực hiện
          khai thác, nâng cấp, cải tạo, bổ sung các chức năng của Website, nhằm đảm bảo bạn có thể sử dụng Website và tương tác với chúng
          tôi một cách hiệu quả nhất. Chúng tôi sẽ nỗ lực để đảm bảo rằng bất kỳ bên thứ ba nào được đề cập ở trên có liên quan đến việc thu
          thập và xử lý thông tin cá nhân của bạn sẽ nhận thức và thấu hiểu Quy định này.
        </div>
        <div className="font-thin">
          ∙ Chúng tôi có thể phải cung cấp các thông tin của bạn cho cơ quan Nhà nước có thẩm quyền vì các mục đích an toàn an ninh và các
          mục đích khác trong phạm vi được yêu cầu hoặc theo luật định.
        </div>
        <br />
        <div className="text-xl">6. An Toàn Dữ Liệu</div>
        <div className="font-thin">
          Chúng tôi luôn nỗ lực để giữ an toàn thông tin cá nhân của khách hàng, chúng tôi đã và đang thực hiện nhiều biện pháp an toàn, bao
          gồm:
        </div>
        <div className="font-thin">
          ∙ Bảo đảm an toàn trong môi trường vận hành: chúng tôi lưu trữ không tin cá nhân khách hàng trong môi trường vận hành an toàn và
          chỉ có nhân viên, đại diện và nhà cung cấp dịch vụ có thể truy cập trên cơ sở cần phải biết. Chúng tôi tôn trọng và cam kết sẽ bảo
          mật những thông tin cá nhân mà bạn cung cấp cho chúng tôi thông qua Website này.
        </div>
        <div className="font-thin">
          ∙ Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân khách hàng, chúng tôi sẽ có trách
          nhiệm thông báo vụ việc cho cơ quan chức năng để điều tra xử lý kịp thời và thông báo cho khách hàng được biết.
        </div>
        <br />
        <div className="text-xl">7. Quyền Của Khách Hàng Đối Với Thông Tin Cá Nhân</div>
        <div className="font-thin">
          Khách hàng có quyền cung cấp thông tin cá nhân cho chúng tôi và có thể thay đổi quyết định đó vào bất cứ lúc nào.
        </div>
        <div className="font-thin">
          Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa
          thông tin cá nhân hoặc yêu cầu chúng tôi thực hiện việc này.
        </div>
        <br />
        <div className="text-xl">8. Thông Tin Liên Hệ</div>
        <div className="font-thin">
          Nếu bạn có câu hỏi hoặc bất kỳ thắc mắc nào về Chính Sách này hoặc thực tế việc thu thập, quản ly thông tin cá nhân của chúng tôi,
          xin vui lòng liên hệ với chúng tôi bằng cách:
        </div>
        <div className="font-thin">
          Gọi điện thoại đến hotline: <i>(Chưa có)</i>
        </div>
        <div className="font-thin">Gửi thư điện tử đến địa chỉ email: moviersals@gmail.com</div>
        <br />
        <div className="text-xl">9. Đơn Vị Thu Thập và Quản Lý Thông Tin</div>
        <div className="font-thin">Công ty MOVIERSALS</div>
        <div className="font-thin">Thành lập và hoạt động theo đồ án tốt nghiệp (Capstone Project) từ Học kì II Năm 2024</div>
        <div className="font-thin">Địa chỉ liên hệ: 01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP.Hồ Chí Minh.</div>
        <br />
        <div className="text-xl">10. Hiệu Lực</div>
        <div className="font-thin">Chính Sách Bảo Mật Thông Tin Cá Nhân này có hiệu lực từ ngày 01/12/2024</div>
        <br />
        <div className="text-xl">ĐẠI DIỆN CÔNG TY MOVIERSALS</div>
        <div className="font-thin">Nguyễn Quốc Hoàng - 19110128</div>
        <div className="font-thin">Chu Nguyễn Hoàng Sơn - 19119128</div>
      </div>
    ),
  },
  {
    id: "chinhsachthanhtoan",
    title: "CHÍNH SÁCH THANH TOÁN",
    body: (
      <div>
        <div>Khi quý khách mua gói sử dụng của Moviersals, quý khách có thể thanh toán bằng các hình thức sau:</div>
        <br />
        <div className="text-2xl font-bold">Thanh toán qua VNPAY (Sandbox)</div>
        <div className="font-thin">
          &emsp;Tên website đăng ký: <b>Moviersal</b>
        </div>
        <div className="font-thin">
          &emsp;Mã website đăng ký: <b>09ZS3WH6</b>
        </div>
        <br />
        <div className="text-2xl font-bold">Thanh toán qua PAYPAL (Sandbox)</div>
        <div className="font-thin">
          &emsp;Tên website đăng ký: <b>Moviersal</b>
        </div>
        <div className="font-thin">
          &emsp;Email website đăng ký: <b>moviersals@gmail.com</b>
        </div>
        <br />
        <div>
          Trong mọi trường hợp, Moviersal rất tiếc không hỗ trợ chính sách hoàn tiền gói thành viên cho khách hàng kể từ khi gói thành viên
          được kích hoạt.
        </div>
        <br />
        <div>Nếu có sự cố trong và sau quá trình thanh toán, vui lòng liên hệ với chúng tôi thông qua Zalo: 0972 xx xx xx</div>
      </div>
    ),
  },
  {
    id: "dieukhoansudungcookies",
    title: "ĐIỀU KHOẢN SỬ DỤNG COOKIES",
    body: (
      <div>
        <div>
          Cookies là các tệp tin chứa một lượng nhỏ dữ liệu thường được sử dụng như là các nhận dạng duy nhất ẩn danh. Chúng được gửi đến
          trình duyệt của bạn từ các trang web mà bạn truy cập và được lưu trữ trên bộ nhớ trong thiết bị của bạn.
        </div>
        <br />
        <div>
          Dịch vụ này không sử dụng "cookies" này một cách rõ ràng. Tuy nhiên, ứng dụng có thể sử dụng mã và thư viện của bên thứ ba sử dụng
          "cookies" để thu thập thông tin và cải thiện dịch vụ của họ. Bạn có thể chọn chấp nhận hoặc từ chối những "cookies" này và biết
          khi nào một "cookie" được gửi đến thiết bị của bạn. Nếu bạn chọn từ chối "cookies" của chúng tôi, bạn có thể không thể sử dụng một
          số phần của Dịch vụ này.
        </div>
        <br />
        <div className="text-xl">1. Thời gian lưu trữ thông tin</div>
        <br />
        <div className="font-thin">
          Chúng tôi lưu trữ thông tin cá nhân của Khách Hàng để đảm bảo cho Khách Hàng khả năng sử dụng liên tục các Sản Phẩm Của Chúng Tôi,
          và lưu trữ trong thời hạn cần thiết để thực hiện được các mục tiêu quy định tại Chính sách quyền riêng tư này, hoặc theo quy định
          của pháp luật (bao gồm cả cho mục đích thuế và kế toán), hoặc để thực hiện các công việc khác như được thông báo trước cho Khách
          Hàng. Thời gian Chúng tôi lưu giữ thông tin cá nhân cụ thể khác nhau tùy thuộc vào mục đích sử dụng và Chúng tôi sẽ xóa thông tin
          cá nhân của Khách Hàng theo quy định của pháp luật hiện hành.
        </div>
        <br />
        <div className="text-xl">2. Những người có thể tiếp cận thông tin:</div>
        <br />
        <div className="font-thin">Nhà cung cấp dịch vụ</div>
        <br />
        <div>Chúng tôi có thể thuê công ty và cá nhân bên thứ ba vì các lý do sau đây:</div>
        <br />
        <div className="font-thin">Hỗ trợ Dịch vụ của chúng tôi</div>
        <div className="font-thin">Cung cấp Dịch vụ thay mặt chúng tôi</div>
        <div className="font-thin">Thực hiện các dịch vụ liên quan đến Dịch vụ; hoặc</div>
        <div className="font-thin">Hỗ trợ chúng tôi trong việc phân tích cách Dịch vụ của chúng tôi được sử dụng.</div>
        <div className="font-thin">
          Chúng tôi muốn thông báo cho người dùng của Dịch vụ này rằng những bên thứ ba này có quyền truy cập vào Thông tin Cá nhân của họ.
          Lý do là để thực hiện các nhiệm vụ được giao cho họ thay mặt chúng tôi. Tuy nhiên, họ có nghĩa vụ không tiết lộ hoặc sử dụng thông
          tin cho bất kỳ mục đích khác.
        </div>
        <br />
        <div className="text-xl">3. Chỉnh sửa thông tin</div>
        <br />
        <div className="font-thin">
          Người dùng đăng nhập tài khoản và chỉnh sửa trực tiếp trên ứng dụng, ứng dụng sẽ cập nhật thông tin mới nhất do người dùng cung
          cấp.
        </div>
      </div>
    ),
  },
  {
    id: "vnpaypayment",
    title: "HƯỚNG DẪN THANH TOÁN VNPAY",
    body: (
      <div>
        <div className="flex flex-col justify-center items-center">
          <Image
            width={500}
            height={600}
            src={"/image/vnpaymethod.png"}
            alt="vnpay"
          />
          <i>Các phương thức thanh toán VNPAY</i>
        </div>
        <br />
        <div className="vnpay_method1">
          <div className="font-bold">1. Phương thức thanh toán qua “Ứng dụng thanh toán hỗ trợ VNPAY-QR”</div> <br />
          <div>
            <b>Bước 1:</b> &nbsp;
            <div className="font-thin">
              Quý khách lựa chọn sản phẩm, và ấn nút "Chọn" <br />
              Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, chọn phương thức thanh toán VNPAY.
            </div>
          </div>
          <br />
          <div className="font-thin">
            <b>Bước 2:</b> &nbsp;Màn hình thanh toán chuyển sang giao diện cổng thanh toán VNPAY. Chọn phương thức “Ứng dụng thanh toán hỗ
            trợ VNPAY-QR”
          </div>
          <br />
          <div>
            <b>Bước 3:</b> &nbsp;
            <div className="font-thin">
              Hệ thống hiển thị mã QR cùng với số tiền cần thanh toán, quý khách kiểm tra lại số tiền này. Đăng nhập và sử dụng ứng dụng
              ngân hàng, chọn chức năng “Quét Mã” và tiến hành quét mã QR trên màn hình thanh toán website.
              <br />
              <i>
                * Lưu ý: Mã QR có hiệu lực trong 15 phút Để quá trình thanh toán thành công, khách hàng vui lòng tham khảo trước các điều
                kiện và thao tác quét mã trên điện thoại để sẵn sàng, tránh sự cố hết thời gian ảnh hưởng đến thanh toán và mã khuyến mại
                của quý khách.
              </i>
            </div>
          </div>
          <br />
          <div>
            <b>Bước 4:</b> &nbsp;
            <div className="font-thin">
              Kiểm tra thông tin, Khi thực hiện thanh toán hoàn tất Quý khách sẽ nhận được thông báo xác nhận đơn hàng đặt hàng thành công
              tại website
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="vnpay_method2">
          <div className="font-bold">2. Phương thức thanh toán qua “Thẻ nội địa và tài khoản ngân hàng”</div> <br />
          <div>
            <b>Bước 1:</b> &nbsp;
            <div className="font-thin">
              Quý khách lựa chọn sản phẩm, và ấn nút "Chọn" <br />
              Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, chọn phương thức thanh toán VNPAY.
            </div>
          </div>
          <br />
          <div className="font-thin">
            <b>Bước 2:</b> &nbsp;Màn hình thanh toán chuyển sang giao diện cổng thanh toán VNPAY. Chọn phương thức “Thẻ nội địa và tài khoản
            ngân hàng” và chọn ngân hàng muốn thanh toán thẻ trong danh sách
          </div>
          <br />
          <div>
            <b>Bước 3:</b> &nbsp;
            <div className="font-thin">
              Quý khách vui lòng thực hiện nhập các thông tin thẻ/tài khoản theo yêu cầu và chọn “Tiếp tục”. Mã OTP sẽ được gửi về điện
              thoại đăng ký, nhập mã OTP để hoàn tất giao dịch
              <br />
              <i>* Lưu ý: Giao dịch sẽ hết hạn sau 15 phút</i>
            </div>
          </div>
          <br />
          <div>
            <b>Bước 4:</b> &nbsp;
            <div className="font-thin">
              Kiểm tra thông tin, Khi thực hiện thanh toán hoàn tất quý khách sẽ nhận được thông báo xác nhận đơn hàng đặt hàng thành công
              tại website
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center gap-4">
                <Image
                  width={500}
                  height={360}
                  src={"/image/vnpaybank.png"}
                  alt="vnpay"
                />
                <Image
                  width={500}
                  height={360}
                  src={"/image/vnpaybankotp.png"}
                  alt="vnpay"
                />
              </div>
              <i>Giao diện thanh toán qua “Thẻ nội địa và tài khoản ngân hàng”</i>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="vnpay_method3">
          <div className="font-bold">3. Phương thức thanh toán qua “Thẻ thanh toán quốc tế (Visa, MasterCard, JCB, UnionPay)”</div> <br />
          <div className="font-thin">Tương tự như phương thức thanh toán “Thẻ nội địa và tài khoản ngân hàng”</div>
        </div>
        <br />
        <br />
        <div className="vnpay_method4">
          <div className="font-bold">4. Phương thức thanh toán qua “Ví điện tử VNPAY”</div> <br />
          <div className="font-thin">Tương tự như phương thức thanh toán “Ứng dụng thanh toán hỗ trợ VNPAY-QR”</div>
        </div>
      </div>
    ),
  },
  {
    id: "paypalpayment",
    title: "HƯỚNG DẪN THANH TOÁN PAYPAL",
    body: (
      <div>
        <div className="flex flex-col justify-center items-center">
          <Image
            width={500}
            height={600}
            src={"/image/paypallogin.png"}
            alt="vnpay"
          />
          <i>Giao diện đăng nhập paypal</i>
        </div>
        <br />
        <div className="paypal_method1">
          <div className="font-bold">1. Phương thức thanh toán trực tiếp qua tài khoản Paypal”</div> <br />
          <div>
            <b>Bước 1:</b> &nbsp;
            <div className="font-thin">
              Quý khách lựa chọn sản phẩm, và ấn nút "Chọn" <br />
              Tại trang thanh toán, vui lòng kiểm tra lại sản phẩm đã đặt, chọn phương thức thanh toán PayPal.
            </div>
          </div>
          <br />
          <div className="font-thin">
            <b>Bước 2:</b> &nbsp;Màn hình thanh toán chuyển sang giao diện cổng thanh toán PayPal. Quý khách nhập địa chỉ email và mật khẩu
            để đăng nhập
          </div>
          <br />
          <div>
            <b>Bước 3:</b> &nbsp;
            <div className="font-thin">
              Hệ thống Paypal sẽ hiển thị số tiền cần trả ở đơn vị USD ỏ góc phải trên cùng, sau khi kiểm tra số tiền, quý khách vui lòng ấn
              "Complete Purchase" để hoàn tất thanh toán. Khi thực hiện thanh toán hoàn tất quý khách sẽ nhận được thông báo xác nhận đơn
              hàng đặt hàng thành công tại website.
              <br />
            </div>
            <div className="flex flex-col justify-center items-center">
              <Image
                width={500}
                height={600}
                src={"/image/paypalinfo.png"}
                alt="vnpay"
              />
              <i>Thông tin thanh toán PayPal</i>
            </div>
          </div>
          <br />
        </div>
      </div>
    ),
  },
];
