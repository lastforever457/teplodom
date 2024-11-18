import { Button, Card, Col, Row, Typography } from "antd";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useToastify from "../../hooks/use-toastify.tsx";
import {
  addToCart,
  addToFavorite,
  removeFromFavorite,
} from "../../redux/productsSlice.tsx";
import SwiperComponent from "./swiper-component.tsx";

const Main = () => {
  const { categories, products } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const { toastSuccess } = useToastify();

  return (
    <div>
      <SwiperComponent />
      <div className="categories">
        <div className="title flex justify-between items-center my-5">
          <Typography.Title level={2}>Categories</Typography.Title>
          <Link to={"/categories"}>
            <Button type="link">See more</Button>
          </Link>
        </div>
        <div className="">
          <Row gutter={16}>
            {categories
              .slice(0, 6)
              .map((category: Record<string, any>, index: number) => (
                <Col span={4} key={index}>
                  <Link to={`/categories/${category.slug}`}>
                    <Card
                      className={"rounded-2xl p-3 hover:shadow-xl"}
                      cover={
                        <div
                          className={
                            "h-[250px] w-full rounded-3xl overflow-hidden"
                          }
                        >
                          <img
                            className={
                              "w-full h-full bg-center bg-cover object-cover"
                            }
                            alt={category.name}
                            src={`https://picsum.photos/200/300?random=${index}`}
                          />
                        </div>
                      }
                    >
                      <div className="flex justify-center items-center text-2xl">
                        <Card.Meta title={category.name} />
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </div>
      </div>
      <div className="products">
        <div className="title flex justify-between items-center my-5">
          <Typography.Title level={2}>Products</Typography.Title>
          <Link to={"/products"}>
            <Button type="link">See more</Button>
          </Link>
        </div>
        <div className="mb-5">
          <Row gutter={[16, 16]}>
            {products
              .slice(0, 8)
              .map((product: Record<string, any>, index: number) => (
                <Col span={6} key={index}>
                  <Link to={`/products/${product.id}`}>
                    <Card
                      className={"rounded-2xl p-3 hover:shadow-xl"}
                      cover={
                        <div
                          className={
                            "h-[300px] w-full rounded-3xl overflow-hidden"
                          }
                        >
                          <img
                            className={
                              "w-full h-full bg-contain bg-center object-contain"
                            }
                            alt={product.name}
                            src={product.images[0]}
                          />
                        </div>
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
                            dispatch(addToCart(product));
                            toastSuccess("Товар добавлен в корзину");
                          }}
                          type="primary"
                        >
                          Add to cart
                        </Button>
                        {product.isSaved ? (
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(removeFromFavorite(product.id));
                              toastSuccess("Товар удален из избранного");
                            }}
                          >
                            <MdOutlineFavorite />
                          </Button>
                        ) : (
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(addToFavorite(product.id));
                              toastSuccess("Товар добавлен в избранное");
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
      </div>
    </div>
  );
};

export default Main;
