import { Row, Col, Typography } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import {
  FaTelegramPlane,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="px-10 lg:px-28 bg-[#2e2845] text-white py-8 w-full">
      <div className="container mx-auto text-white">
        <Row gutter={[16, 16]} justify="space-between">
          <Col xs={24} md={6}>
            <div className="flex flex-col items-start gap-3">
              <img src="/main-logo.png" width={150} alt="" />
              <Typography.Text className="text-white">
                Интернет магазин строй материалов
              </Typography.Text>
              <div className="mt-4">
                <p>ул.Уста Ширин, рынок</p>
                <p>Джамий, дом 134</p>
              </div>
            </div>
          </Col>
          <Col xs={24} md={6}>
            <div className="flex flex-col items-start">
              <Typography.Title level={5} className="text-white">
                Быстрые ссылки
              </Typography.Title>
              <ul className="space-y-2">
                <li>Мастерам</li>
                <li>Оформление заказа</li>
                <li>Пользовательское соглашение</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} md={6}>
            <div className="flex flex-col items-start">
              <Typography.Title level={5} className="text-white">
                Полезное
              </Typography.Title>
              <ul className="space-y-2">
                <li>О нас</li>
                <li>Поставщикам</li>
                <li>Возврат товара</li>
              </ul>
            </div>
          </Col>
          <Col xs={24} md={6}>
            <div className="flex flex-col items-start">
              <Typography.Title level={5} className="text-white">
                Контакты
              </Typography.Title>
              <ul className="space-y-2">
                <li>
                  <PhoneOutlined className="mr-2" /> +998 97 761 62 51
                </li>
                <li>
                  <PhoneOutlined className="mr-2" /> +998 93 556 91 31
                </li>
              </ul>
              <div className="flex space-x-3 mt-4 text-xl">
                <FaTelegramPlane />
                <FaInstagram />
                <FaFacebook />
                <FaGlobe />
              </div>
            </div>
          </Col>
        </Row>
        <div className="border-t border-white mt-8 pt-4 text-center">
          <p>© 2021 Teplodom. Все права защищены</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
    