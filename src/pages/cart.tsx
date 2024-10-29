import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Typography,
  Form,
  Input,
  Checkbox,
  Select,
} from "antd";
import useReducerContext from "../hooks/use-reducer-context.tsx";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useReducerActions } from "../hooks/use-reducer-actions.tsx";
import { useRouterPush } from "../hooks/use-router-push.tsx";
import { useLocationParams } from "../hooks/use-location-params.tsx";
import { useForm } from "antd/es/form/Form";

const Cart = () => {
  const { context } = useReducerContext();
  const { state } = context;
  const { removeFromCart, addToCart } = useReducerActions();
  const { push } = useRouterPush();
  const { query } = useLocationParams();
  const [form] = useForm();

  return (
    <div className="mb-5">
      <Typography.Title level={2}>Cart</Typography.Title>
      <div className="">
        <Row gutter={16}>
          {state.cart.map((product: Record<string, any>, index: number) => (
            <Col span={6} key={index}>
              <Card
                className={"h-full"}
                cover={
                  <img
                    className={"h-[350px] bg-center bg-contain object-contain"}
                    src={product.images[0]}
                    alt=""
                  />
                }
              >
                <div className="flex justify-between items-center">
                  <Card.Meta title={product.title} />
                  <h2 className={"text-3xl font-semibold"}>
                    {product.quantity}
                  </h2>
                </div>
                <p className={"text-xl font-semibold my-2"}>${product.price}</p>
                <div className="flex justify-between items-center">
                  <div className={"flex gap-2 items-center justify-center"}>
                    <Button
                      onClick={() => {
                        removeFromCart(product.id);
                      }}
                      type="primary"
                    >
                      Remove from cart
                    </Button>
                    <Button
                      onClick={() => {
                        removeFromCart(product.id);
                      }}
                      shape="default"
                    >
                      -1
                    </Button>
                    <Button
                      onClick={() => {
                        addToCart(product);
                      }}
                      shape="default"
                    >
                      +1
                    </Button>
                  </div>
                  {product.isFavourited ? (
                    <Button>
                      <MdOutlineFavoriteBorder />
                    </Button>
                  ) : (
                    <Button>
                      <MdOutlineFavorite />
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Button
        type="primary"
        className="mt-5"
        onClick={() => {
          push({ query: { ...query, buy: true } });
        }}
      >
        Buy
      </Button>

      <Modal
        width={"60%"}
        footer={
          <div className="flex justify-start items-center">
            <Button onClick={() => form.submit()} type="primary">
              Оформить заказ
            </Button>
          </div>
        }
        onCancel={() => {
          push({ query: { buy: undefined } });
        }}
        title={"Оформление заказа"}
        open={!!query.buy as boolean}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Тип оплаты"
                name="paymentType"
                rules={[{ required: true, message: "Выберите тип оплаты" }]}
              >
                <Select>
                  <Select.Option value="cash">Наличными</Select.Option>
                  <Select.Option value="card">Картой</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Введите номер телефона"
                name="phone"
                rules={[{ required: true, message: "Введите номер телефона" }]}
              >
                <Input addonBefore="+998" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Введите имя"
                name="name"
                rules={[{ required: true, message: "Введите имя" }]}
              >
                <Input placeholder="Шерзод Иброхимов" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Введите область"
                name="region"
                rules={[{ required: true, message: "Введите область" }]}
              >
                <Input placeholder="Ташкент" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Введите город / район"
                name="city"
                rules={[{ required: true, message: "Введите город / район" }]}
              >
                <Input placeholder="Яшнобод район" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Введите населённый пункт"
                name="settlement"
                rules={[
                  { required: true, message: "Введите населённый пункт" },
                ]}
              >
                <Input placeholder="Ташкент" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Введите адрес"
                name="address"
                rules={[{ required: true, message: "Введите адрес" }]}
              >
                <Input placeholder="ул.Уста Ширин, рынок Джамий, дом 134" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="agreement" valuePropName="checked">
                <Checkbox>
                  Я согласен с <a href="#">правилами публичной оферты</a>
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Cart;
