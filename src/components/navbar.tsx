import { Button, Input } from "antd";
import { IoCartSharp, IoSearch } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useMemo } from "react";

const Navbar = () => {
  const navbarData = useMemo(
    () => [
      {
        id: 1,
        title: "Товары по акции",
        href: "/products/discount",
      },
      {
        id: 2,
        title: "Новинки",
        href: "/products/new",
      },
      {
        id: 3,
        title: "Поставщикам",
        href: "/suppliers",
      },
      {
        id: 4,
        title: "Контакты",
        href: "/contacts",
      },
      {
        id: 5,
        title: "Возврат товара",
        href: "/returns",
      },
    ],
    [],
  );

  return (
    <>
      <div className={"px-20 py-5 flex justify-between items-center"}>
        <div className="flex">
          <img src="/main.png" width={280} alt="main-logo" />
        </div>
        <div className="flex justify-between gap-3 items-center">
          <Input
            prefix={<IoSearch />}
            type="text"
            className={
              "py-3 text-xl rounded-2xl gap-3 outline-0 border-0 hover:shadow-md"
            }
            placeholder={"Search..."}
          />
          <button
            className={"text-xl p-4 bg-white rounded-full hover:shadow-md"}
          >
            <MdFavorite />
          </button>
          <button
            className={"text-xl p-4 bg-white rounded-full hover:shadow-md"}
          >
            <IoCartSharp />
          </button>
          <button
            className={
              "text-xl flex justify-center items-center gap-3 p-4 bg-white rounded-full hover:shadow-md px-7"
            }
          >
            <FaUser />
            Profile
          </button>
        </div>
      </div>
      <div className="px-20 flex justify-between items-center my-5">
        {navbarData.map((item: Record<string, any>, i: number) => (
          <Button
            key={i}
            type="text"
            className={
              "text-xl hover:text-blue-500 bg-white py-5 px-7 rounded-2xl"
            }
          >
            {item.title}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Navbar;
