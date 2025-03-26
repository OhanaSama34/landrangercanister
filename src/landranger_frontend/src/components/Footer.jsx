import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A0019] text-white px-10 py-8 mt-8 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Bagian Kiri */}
          <div className="md:w-1/3">
            <a className="text-2xl font-bold">
              Land<span className="text-purple-600">Ranger</span>
            </a>
            <p className="text-sm opacity-80 mt-2">
              We are more than just design. We are committed to protecting you, your home, and your land.
            </p>
          </div>

          {/* Bagian Tengah */}
          <div className="md:w-1/3 flex flex-col md:flex-row md:justify-center gap-4 mt-6 md:mt-0">
            <div>
              <h6 className="font-semibold text-lg">LandRanger</h6>
              <ul className="text-sm opacity-80 space-y-1">
                <li><a href="#" className="hover:underline">Beranda</a></li>
                <li><a href="#" className="hover:underline">About Us</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-lg">&nbsp;</h6>
              <ul className="text-sm opacity-80 space-y-1">
                <li><a href="#" className="hover:underline">Help</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Bagian Kanan */}
          <div className="md:w-1/3 text-right">
            <h4 className="font-semibold text-lg">
              Contact us and we will <br /> answer all questions
            </h4>
            <button className="mt-3 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg">
              Contact us
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bawah */}
      <div className="border-t border-gray-600 mt-6 pt-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
        <p>©2025 LandRanger Digital Terms & Conditions</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <span>|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
