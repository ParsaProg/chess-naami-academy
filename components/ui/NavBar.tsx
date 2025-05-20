import { FiHome } from "react-icons/fi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GiBrain } from "react-icons/gi";
import { FaRegCommentDots } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import "../../styles/navbar-res.css";
import { FiMenu } from "react-icons/fi";
import { FaChessKnight } from "react-icons/fa";


export default function NavBar() {
  const navTextClass =
    "text-black font-bold text-xl cursor-pointer rounded-md hover:bg-slate-200 gap-x-2 flex items-center transition-all duration-200 p-2";
  return (
    <div className="transition-all duration-200 border-b-[1px] border-b-slate-300 mt-3 mx-auto">
      <div className="main-container w-[85%] mx-auto flex items-center gap-x-[20px] h-[50px] mb-3 justify-start">
        <div className="flex items-center gap-x-3 font-bold text-lg md:text-2xl text-[#F69B0D]">
          <FaChessKnight
            size={30}
          />
          آکادمی شطرنج نعامی
        </div>
        <section className="mr-14 flex items-center gap-x-[30px] links">
          <div className={`${navTextClass}`}>
            <FiHome size={20} />
            صفحه اصلی
          </div>
          <div className={`${navTextClass}`}>
            <LiaChalkboardTeacherSolid size={20} />
            دوره‌ها
          </div>
          <div className={`${navTextClass}`}>
            <GiBrain size={20} />
            ویژگی‌ها
          </div>
          <div className={`${navTextClass}`}>
            <FaRegCommentDots size={20} />
            نظرات
          </div>
          <div className={`${navTextClass}`}>
            <GrContactInfo size={20} />
            تماس با‌ ما
          </div>
        </section>
        <div className="cursor-pointer menu rounded-lg border-[2px] border-slate-200 p-3">
          <FiMenu size={25} />
        </div>
      </div>
    </div>
  );
}
