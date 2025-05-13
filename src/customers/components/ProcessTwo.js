import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProcessTwo() {
  console.log("ProcessTwo loaded");           // Debug
  const [options, setOptions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setOptions([
      { id: "std", label: "การขนส่งแบบช้า", price: 0, eta: "17 ธ.ค. 2023" },
      { id: "exp", label: "การขนส่งแบบรวดเร็ว", price: 30, eta: "18 ธ.ค. 2023" }
    ]);
    setSelectedId("std");
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <main className="w-full max-w-4xl px-6 py-16 flex-1">
        <h2 className="text-2xl font-semibold mb-10">การขนส่ง</h2>

        {loading ? (
          <p className="text-center text-gray-500">กำลังโหลด…</p>
        ) : (
          <ul className="space-y-6">
            {options.map(o => (
              <li key={o.id}>
                <ShippingCard
                  option={o}
                  checked={selectedId === o.id}
                  onSelect={() => setSelectedId(o.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function ShippingCard({ option, checked, onSelect }) {
  return (
    <label
      className={`w-full flex items-center justify-between gap-8
                  rounded-xl border px-8 py-6 cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${checked ? "border-gray-300 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}
    >
      <div className="flex items-center gap-5 flex-1">
        <span className={`h-6 w-6 rounded-full ring-1 ring-gray-400 ${checked ? "bg-gray-900 ring-gray-900" : "bg-white"}`}></span>
        <span className="text-base">
          {option.price === 0 ? "ฟรี" : `฿${option.price}`} &nbsp;{option.label}
        </span>
      </div>
      <span className="text-base text-gray-600">{option.eta}</span>
      <input type="radio" className="sr-only" checked={checked} onChange={onSelect} />
    </label>
  );
}
