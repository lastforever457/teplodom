import { Button, Form, Input, Modal } from "antd";
import { IoCartSharp, IoSearch } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocationParams } from "../hooks/use-location-params.tsx";
import { useRouterPush } from "../hooks/use-router-push.tsx";
import useAuth from "../hooks/use-auth.tsx";
import { useForm } from "antd/es/form/Form";
import useToastify from "../hooks/use-toastify.tsx";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { query } = useLocationParams();
  const { push } = useRouterPush();
  const { isAuthenticated, setAuthenticated } = useAuth();
  const [form] = useForm();
  const { toastSuccess, toastError } = useToastify();

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

  const onClose = () => {
    push({ query: { login: undefined, register: undefined } });
  };

  const onFinish = (values: any) => {
    if (values.email && values.password) {
      setAuthenticated(true);
      toastSuccess("Successfully logged in");
      onClose();
    } else {
      toastError("Invalid email or password");
    }
  };

  return (
    <>
      <div className={"px-20 py-5 flex justify-between items-center"}>
        <div className="flex">
          <Link to={"/"}>
            <img src="/main.png" width={280} alt="main-logo" />
          </Link>
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
          <Link to={"/favorites"}>
            <button
              className={"text-xl p-4 bg-white rounded-full hover:shadow-md"}
            >
              <MdFavorite />
            </button>
          </Link>
          <Link to={"/cart"}>
            <button
              className={"text-xl p-4 bg-white rounded-full hover:shadow-md"}
            >
              <IoCartSharp />
            </button>
          </Link>
          {!isAuthenticated ? (
            <button
              onClick={() => {
                push({ query: { login: true } });
              }}
              className={
                "text-xl flex justify-center items-center gap-3 p-4 bg-white rounded-full hover:shadow-md px-7"
              }
            >
              <FaUser />
              Profile
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthenticated(false);
                localStorage.removeItem('token')
                toastSuccess("Successfully logged out");
              }}
              className={
                "text-xl flex w-[250px] justify-center items-center gap-3 p-4 bg-white rounded-full hover:shadow-md px-7"
              }
            >
              <FaUser />
              Log out
            </button>
          )}
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
      <Modal
        open={!!query.login || !!query.register}
        title={query.login ? "Login" : "Register"}
        onCancel={onClose}
        okText={query.login ? "Login" : "Register"}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={onFinish}
          className={"my-5"}
          layout={"vertical"}
        >
          <Form.Item
            name={"email"}
            label={"Email address:"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={"Password:"}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Navbar;
