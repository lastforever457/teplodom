import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  brands,
  colors,
  countries,
} from "../../contexts/reducer-context-provider";
import { useReducerActions } from "../../hooks/use-reducer-actions";
import useReducerContext from "../../hooks/use-reducer-context";

const Filter = () => {
  const [form] = Form.useForm();
  const { context } = useReducerContext();
  const {
    addToFavorite,
    removeFromFavorite,
    addToCart,
    setProducts: settingProducts,
  } = useReducerActions();
  const [products, setProducts] = useState<Record<string, any>[]>([]);

  const onFinish = (values: any) => {
    const { region, priceFrom, priceTo, brands, color } = values;

    let filteredProducts = [...context.state.products];

    if (region?.length) {
      filteredProducts = filteredProducts.filter((product) =>
        region.includes(product.country)
      );
    }

    if (priceFrom) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= Number(priceFrom)
      );
    }

    if (priceTo) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= Number(priceTo)
      );
    }

    if (brands?.length) {
      filteredProducts = filteredProducts.filter((product) =>
        brands.includes(product.brand)
      );
    }

    if (color) {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === color
      );
    }

    settingProducts(filteredProducts);

    setProducts(filteredProducts);
  };

  useEffect(() => {
    setProducts(context.state.products);
  }, [context.state.products]);

  const handleClear = () => {
    form.resetFields();
    setProducts(context.state.tempProducts);
    settingProducts(context.state.tempProducts);
  };

  return (
    <div>
      <Row gutter={20}>
        <Col span={8}>
          <div className="bg-white rounded-xl p-5">
            <Typography.Title>Filter</Typography.Title>
            <Form onFinish={onFinish} layout="vertical" form={form}>
              <Form.Item label="Region" name="region">
                <Select mode="tags">
                  {countries.map((country: string) => (
                    <Select.Option key={country} value={country}>
                      {country}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Price">
                <Space.Compact className="w-full">
                  <Form.Item name="priceFrom">
                    <Input placeholder="From" type="number" />
                  </Form.Item>
                  <Form.Item name="priceTo">
                    <Input placeholder="To" type="number" />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
              <Form.Item label="Color" name="color">
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`rounded-full w-[40px] h-[40px] cursor-pointer hover:shadow-xl`}
                      style={{
                        backgroundColor: color,
                        border: "1px solid #ccc",
                      }}
                    ></div>
                  ))}
                </div>
              </Form.Item>
              <Form.Item label="Brands" name="brands">
                <Select mode="tags">
                  {brands.map((brand: string, index: number) => (
                    <Select.Option key={index} value={brand}>
                      {brand}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
            <div className="flex justify-between mt-5 gap-3">
              <Button onClick={handleClear} className="w-full p-5 text-xl">
                Clear
              </Button>
              <Button
                onClick={() => form.submit()}
                className="w-full p-5 text-xl"
                type="primary"
              >
                Filter
              </Button>
            </div>
          </div>
        </Col>
        <Col span={16}>
          <div className="bg-white flex flex-col gap-3 p-5">
            <p className="text-4xl font-bold">Result</p>
            <Row gutter={[16, 16]}>
              {products &&
                products.map((product: Record<string, any>) => (
                  <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                    <Link to={`${product.id}`}>
                      <Card
                        className={"shadow-lg h-full"}
                        cover={
                          <img
                            className={
                              "bg-center bg-contain object-contain h-[250px]"
                            }
                            src={product.images[0]}
                            alt={product.name}
                          />
                        }
                      >
                        <Card.Meta title={product.title} />
                        <p className={"text-xl font-semibold my-2"}>
                          ${product.price}
                        </p>
                        <div className="flex justify-between items-center">
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              addToCart(product);
                            }}
                            type="primary"
                          >
                            Add to cart
                          </Button>
                          {product.isSaved ? (
                            <Button
                              onClick={(event) => {
                                event.preventDefault();
                                removeFromFavorite(product.id);
                              }}
                            >
                              <MdOutlineFavorite />
                            </Button>
                          ) : (
                            <Button
                              onClick={(event) => {
                                event.preventDefault();
                                addToFavorite(product.id);
                              }}
                            >
                              <MdOutlineFavoriteBorder />
                            </Button>
                          )}
                        </div>
                      </Card>
                    </Link>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Filter;
