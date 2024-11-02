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
import { useLocationParams } from "../hooks/use-location-params.tsx";
import { useForm } from "antd/es/form/Form";
import { useEffect, useMemo, useState } from "react";
import { useRouterPush } from "../hooks/use-router-push.tsx";

const Cart = () => {
  const { context } = useReducerContext();
  const { state } = context;
  const { removeFromCart, addToCart, clearCart } = useReducerActions();
  const { push } = useRouterPush();
  const { query } = useLocationParams();
  const [form] = useForm();
  const [selectedRegion, setSelectedRegion] = useState(1);
  const [remainedDistricts, setRemainedDistricts] =
    useState<Record<string, any>[]>();

  const regions = useMemo(
    () => [
      {
        id: 1,
        label: "Ташкент",
        value: "Ташкент",
      },
      {
        id: 2,
        label: "Самарканд",
        value: "Самарканд",
      },
      {
        id: 3,
        label: "Бухара",
        value: "Бухара",
      },
      {
        id: 4,
        label: "Фергана",
        value: "Фергана",
      },
      {
        id: 5,
        label: "Навои",
        value: "Навои",
      },
      {
        id: 6,
        label: "Хорезм",
        value: "Хорезм",
      },
      {
        id: 7,
        label: "Каракалпакстан",
        value: "Каракалпакстан",
      },
      {
        id: 8,
        label: "Сурхандарья",
        value: "Сурхандарья",
      },
      {
        id: 9,
        label: "Сырдарья",
        value: "Сырдарья",
      },
      {
        id: 10,
        label: "Наманган",
        value: "Наманган",
      },
      {
        id: 11,
        label: "Джизак",
        value: "Джизак",
      },
      {
        id: 12,
        label: "Кашкадарья",
        value: "Кашкадарья",
      },
    ],
    []
  );

  const districts = useMemo(
    () => [
      { regionId: 1, label: "Юнусобод", value: "Юнусобод" },
      { regionId: 1, label: "Мирзо Улугбек", value: "Мирзо Улугбек" },
      { regionId: 1, label: "Чилонзор", value: "Чилонзор" },
      { regionId: 1, label: "Яккасарой", value: "Яккасарой" },
      { regionId: 1, label: "Шайхонтохур", value: "Шайхонтохур" },

      { regionId: 2, label: "Самарканд шахар", value: "Самарканд шахар" },
      { regionId: 2, label: "Ургут", value: "Ургут" },
      { regionId: 2, label: "Каттақўрғон", value: "Каттақўрғон" },
      { regionId: 2, label: "Тойлоқ", value: "Тойлоқ" },
      { regionId: 2, label: "Иштихон", value: "Иштихон" },

      { regionId: 3, label: "Бухара шахар", value: "Бухара шахар" },
      { regionId: 3, label: "Гиждувон", value: "Гиждувон" },
      { regionId: 3, label: "Вобкент", value: "Вобкент" },
      { regionId: 3, label: "Когон", value: "Когон" },
      { regionId: 3, label: "Олот", value: "Олот" },

      { regionId: 4, label: "Фергана шахар", value: "Фергана шахар" },
      { regionId: 4, label: "Марғилон", value: "Марғилон" },
      { regionId: 4, label: "Қўқон", value: "Қўқон" },
      { regionId: 4, label: "Учкўприк", value: "Учкўприк" },
      { regionId: 4, label: "Яйпан", value: "Яйпан" },

      { regionId: 5, label: "Навои шахар", value: "Навои шахар" },
      { regionId: 5, label: "Учқудуқ", value: "Учқудуқ" },
      { regionId: 5, label: "Зарафшон", value: "Зарафшон" },
      { regionId: 5, label: "Конимех", value: "Конимех" },
      { regionId: 5, label: "Нурат", value: "Нурат" },

      { regionId: 6, label: "Урганч", value: "Урганч" },
      { regionId: 6, label: "Хива", value: "Хива" },
      { regionId: 6, label: "Хонқа", value: "Хонқа" },
      { regionId: 6, label: "Янгиариқ", value: "Янгиариқ" },
      { regionId: 6, label: "Боғот", value: "Боғот" },

      { regionId: 7, label: "Нукус", value: "Нукус" },
      { regionId: 7, label: "Қонликўл", value: "Қонликўл" },
      { regionId: 7, label: "Мўйноқ", value: "Мўйноқ" },
      { regionId: 7, label: "Тахтакўпир", value: "Тахтакўпир" },
      { regionId: 7, label: "Шуманай", value: "Шуманай" },

      { regionId: 8, label: "Термиз", value: "Термиз" },
      { regionId: 8, label: "Шўрчи", value: "Шўрчи" },
      { regionId: 8, label: "Ангор", value: "Ангор" },
      { regionId: 8, label: "Қизириқ", value: "Қизириқ" },
      { regionId: 8, label: "Музработ", value: "Музработ" },

      { regionId: 9, label: "Гулистон", value: "Гулистон" },
      { regionId: 9, label: "Сайхунобод", value: "Сайхунобод" },
      { regionId: 9, label: "Ширин", value: "Ширин" },
      { regionId: 9, label: "Мирзаобод", value: "Мирзаобод" },
      { regionId: 9, label: "Янгиер", value: "Янгиер" },

      { regionId: 10, label: "Наманган шахар", value: "Наманган шахар" },
      { regionId: 10, label: "Учқўрғон", value: "Учқўрғон" },
      { regionId: 10, label: "Тўрақўрғон", value: "Тўрақўрғон" },
      { regionId: 10, label: "Поп", value: "Поп" },
      { regionId: 10, label: "Чуст", value: "Чуст" },

      { regionId: 11, label: "Джизак шахар", value: "Джизак шахар" },
      { regionId: 11, label: "Зафаробод", value: "Зафаробод" },
      { regionId: 11, label: "Ғаллаорол", value: "Ғаллаорол" },
      { regionId: 11, label: "Дўстлик", value: "Дўстлик" },
      { regionId: 11, label: "Мирзачўл", value: "Мирзачўл" },

      { regionId: 12, label: "Карши", value: "Карши" },
      { regionId: 12, label: "Шахрисабз", value: "Шахрисабз" },
      { regionId: 12, label: "Касби", value: "Касби" },
      { regionId: 12, label: "Камаши", value: "Камаши" },
      { regionId: 12, label: "Муборак", value: "Муборак" },
    ],
    []
  );

  useEffect(() => {
    if (selectedRegion) {
      const remained = districts.filter(
        (district: Record<string, any>) => district.regionId === selectedRegion
      );
      setRemainedDistricts(remained);
    }
  }, [selectedRegion, districts]);

  return (
    <div className="mb-5 min-h-[482px]">
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
      {state.cart.length !== 0 ? (
        <Button
          type="primary"
          className="mt-5"
          onClick={() => {
            push({ query: { ...query, buy: true } });
          }}
        >
          Buy
        </Button>
      ) : (
        <p>Please select product for add it to cart</p>
      )}

      <Modal
        width={"60%"}
        footer={
          <div className="flex justify-start items-center">
            <Button
              onClick={() => {
                form.submit();
              }}
              type="primary"
            >
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
        <Form
          onFinish={(values: Record<string, any>) => {
            clearCart();
            push({ query: { buy: undefined } });
          }}
          layout="vertical"
          form={form}
        >
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
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Введите область"
                name="region"
                rules={[{ required: true, message: "Введите область" }]}
              >
                <Select
                  defaultValue={1}
                  onChange={(value) => setSelectedRegion(value)}
                >
                  {regions.map((region) => (
                    <Select.Option key={region.id} value={region.id}>
                      {region.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Введите город / район"
                name="city"
                rules={[{ required: true, message: "Введите город / район" }]}
              >
                <Select
                  defaultValue={districts[0].value}
                  onChange={(value) => setSelectedRegion(Number(value))}
                >
                  {remainedDistricts &&
                    remainedDistricts.map(
                      (district: Record<string, any>, i: number) => (
                        <Select.Option key={i} value={district.value}>
                          {district.label}
                        </Select.Option>
                      )
                    )}
                </Select>
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
                <Input />
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
