import { useEffect, useState } from "react";

const Footer = () => {
  const [currentDate, setcurrentDate] = useState("");

  useEffect(() => {
    let date = new Date();
    setcurrentDate(date.getFullYear());
  }, []);
  return (
    <div className="bg-yellow-500 w-[95%] rounded-3xl border-2 border-yellow-900 mt-[20px] text-center flex flex-col justify-center items-center gap-[10px]">
      <a className="text-white text-lg font-bold mt-[10px]" href={"/"}>
        Homepage
      </a>
      <a className="text-white text-lg font-bold" href={"/About"}>
        About
      </a>
      <h1 className="text-gray-100 text-lg">
        ©Blogy {currentDate}. Created and Published by
      </h1>
      <h1 className="text-white text-lg mb-[10px]">Syed Sufyan Hassan</h1>
    </div>
  );
};

export default Footer;
