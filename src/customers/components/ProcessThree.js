import { useNavigate } from "react-router-dom";


/* ================ MAIN ================ */
export default function ProcessThree() {
  const navigate = useNavigate();

  const order = {
    items: [
      {
        id: 1,
        name: "Apple iPhone 14 Pro Max 128Gb",
        price: 1399,
        img: "/iphone.jpg",
      },
      { id: 2, name: "AirPods Max Silver", price: 549, img: "/airpods.jpg" },
      {
        id: 3,
        name: "Apple Watch Series 9 GPS 41 mm",
        price: 399,
        img: "/watch.jpg",
      },
    ],
    address: "1131 Dusty Townline, Jacksonville, TX 40322",
    shipping: "ฟรี",
    subtotal: 2347,
    discount: 850,
    fee: 80,
  };
  const total = order.subtotal - order.discount + order.fee;

  /* -------- confirm -------- */
  const handleConfirm = (e) => {
    e.preventDefault();
    // TODO: payment API
    alert("ชำระเงินสำเร็จ!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">

      {/* ---------- layout ---------- */}
      <main
        className="w-full max-w-[1100px] px-8 py-20
                   grid lg:grid-cols-[420px_1fr] gap-24"
      >
        {/* ===== LEFT : SUMMARY ===== */}
        <section className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-6">สรุปการสั่งซื้อ</h3>

          <ul className="space-y-3 mb-8">
            {order.items.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between gap-4
                           bg-gray-50 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={it.img}
                    alt=""
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <span className="text-sm">{it.name}</span>
                </div>
                <span className="font-medium">฿{it.price}</span>
              </li>
            ))}
          </ul>

          <dl className="text-sm space-y-6 mb-6">
            <dt className="font-medium">ที่อยู่</dt>
            <dd className="mb-3 text-base font-semibold ">{order.address}</dd>

            <div className="text-sm space-y-6 mb-6">
            <dt className="font-medium">การจัดส่ง</dt>
             <dd>฿{order.shipping}</dd>
  </div>


        {/* ราคาสินค้า */}
        <div className="flex justify-between">
            <dt className="font-medium text-base font-semibold  ">ราคาสินค้า</dt>
            <dd className="text-base font-semibold ">฿{order.subtotal}</dd>
        </div>

        {/* ส่วนลด */}
        <div className="flex justify-between">
            <dt className="font-medium">ส่วนลด</dt>
            <dd className="text-base font-semibold ">฿{order.discount}</dd>
        </div>

        {/* ค่าจัดส่ง */}
        <div className="flex justify-between">
            <dt className="font-medium">ค่าจัดส่ง</dt>
            <dd className="text-base font-semibold ">฿{order.fee}</dd>
            </div>
          </dl>

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>฿{total}</span>
          </div>
        </section>

        {/* ===== RIGHT : PAYMENT ===== */}
        <section>
          <h3 className="text-lg font-semibold mb-6">การชำระเงิน</h3>

          {/* card preview */}
          <div
            className="bg-black text-white rounded-xl w-full max-w-lg h-56 mb-8 flex flex-col justify-between p-6"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="bg-yellow-400 h-3 w-4 rounded-sm block" />
              <span className="opacity-80">))</span>
            </div>
            <div className="tracking-widest text-lg">
              4085&nbsp;9536&nbsp;8475&nbsp;9530
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Cardholder</span>
              <span className="flex space-x-1">
                <span className="h-3 w-3 bg-red-600 rounded-full inline-block" />
                <span className="h-3 w-3 bg-yellow-400 rounded-full inline-block" />
              </span>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleConfirm} className="space-y-4 ">
          <input required placeholder="ชื่อผู้ถือบัตร" className="input" />
         <input required placeholder="เลขบัตร"        className="input" maxLength={19} />
            <div className="flex gap-4">
                <input required placeholder="วันหมดอายุ" className="input flex-1" />
                <input required placeholder="CVV"        className="input flex-1" maxLength={4} />
            </div>

            
           
          </form>
        </section>
      </main>
    </div>
  );
}



