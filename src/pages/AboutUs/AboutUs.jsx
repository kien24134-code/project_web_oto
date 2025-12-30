import Header from "../../components/Header/Header";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <>
       <div className={styles.page}>
        <div className={styles.contentBackground}>
          <div className={styles.content}>
            <h1>About US</h1>
            <p>
              Welcome to Kien Auto, the leading platform for buying and selling
              cars, designed for those who value convenience, transparency, and
              quality. We are committed to providing our customers with the best
              experience, offering a wide range of vehicles from budget-friendly
              models to high-end luxury cars, catering to all your
              transportation needs. With a team of experienced professionals, we
              not only deliver high-quality vehicles but also provide dedicated
              support throughout the entire process—from consultation and
              purchasing to warranty and after-sales service. Additionally, our
              smart online system allows you to easily search, compare, and
              choose the perfect car without wasting time. Let Kien Auto be your
              trusted companion on every journey! 🚗💨
            </p>

            <h2>Về chúng tôi</h2>
            <p>
              Chào mừng bạn đến với Kien Auto, nền tảng mua bán ô tô hàng đầu
              dành cho những ai yêu thích sự tiện lợi, minh bạch và chất lượng.
              Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm tốt
              nhất với đa dạng dòng xe từ phổ thông đến cao cấp, đáp ứng mọi nhu
              cầu di chuyển của bạn. Với đội ngũ chuyên gia giàu kinh nghiệm,
              chúng tôi không chỉ cung cấp các mẫu xe chất lượng mà còn hỗ trợ
              khách hàng tận tâm từ khâu tư vấn, mua bán đến bảo hành và hậu
              mãi. Bên cạnh đó, hệ thống trực tuyến thông minh giúp bạn dễ dàng
              tìm kiếm, so sánh và lựa chọn chiếc xe phù hợp nhất mà không cần
              mất nhiều thời gian. Hãy để Kien Auto đồng hành cùng bạn trên mọi
              hành trình! 🚗💨
            </p>

            <h3>How can we help you?</h3>

            <div className={styles.faq}>
              <h4>Frequently Asked Questions</h4>
              <ul>
                <li>
                  <a
                    href="https://tfsvn.com.vn/vay-mua-o-to-cu-can-luu-y-gi/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    How to buy a car?
                  </a>
                </li>
                <li>
                  <a
                    href="https://toyotasure.vn/ban-o-to-cu-gia-cao/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    How to sell a car?
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    What are the payment options?
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    How to schedule a test drive?
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.contact}>
              <h5>Contact Us</h5>
              <p>Email: kienauto@gmail.com</p>
              <p>Phone: 08695283304 - 0866034703</p>
              <p>Address: 123 Nguyễn Trãi, Thanh Xuân, Hà Nội</p>
            </div>

            <div className={styles.recruit}>
              <h5>Recruitment / Tuyển dụng</h5>
              <p>
                Kien Auto tuyển nhân viên bán hàng tại các vị trí nhân viên
                sale, nhân viên chăm sóc khách hàng, nhân viên lễ tân. Đến với
                Kien Auto, chúng tôi là một doanh nghiệp bán ô tô chuyên các
                dòng xe của Toyota số 1 tại Hà Nội. Nếu bạn có đam mê về xe ô tô
                hay là có nhu cầu tìm kiếm việc làm với mức lương 10.000.000 -
                20.000.000 thì đừng ngại mà hãy kết nối ngay với chúng tôi! Anh
                Huy Auto xin chân thành cảm ơn! 
              </p>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeyn9xy6INDafosVSP6iPKWGlqJ_fP3GmVQTS3hmsJXgZ5qFA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.applyBtn}>Ứng tuyển việc làm</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
