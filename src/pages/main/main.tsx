import SwiperComponent from "./swiper-component.tsx";
import { Button, Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import useReducerContext from "../../hooks/use-reducer-context.tsx";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useReducerActions } from "../../hooks/use-reducer-actions.tsx";

const Main = () => {
  const { context } = useReducerContext();
  const { state } = context;
  const { addToCart, addToFavorite, removeFromFavorite } = useReducerActions();

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
            {state.categories.slice(0, 6).map((category: Record<string, any>, index: number) => (
              <Col span={4} key={index}>
                <Link to={`/categories/${category.slug}`}>
                  <Card
                    className={"rounded-2xl p-3 hover:shadow-xl"}
                    cover={
                      <div className={"h-[250px] w-full rounded-3xl overflow-hidden"}>
                        <img
                          className={"w-full h-full bg-center bg-cover object-cover"}
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
            {state.products.slice(0, 8).map((product: Record<string, any>, index: number) => (
              <Col span={6} key={index}>
                <Link to={`/products/${product.id}`}>
                  <Card
                    className={"rounded-2xl p-3 hover:shadow-xl"}
                    cover={
                      <div className={"h-[300px] w-full rounded-3xl overflow-hidden"}>
                        <img
                          className={"w-full h-full bg-contain bg-center object-contain"}
                          alt={product.name}
                          src={product.images[0]}
                        />
                      </div>
                    }
                  >
                    <Card.Meta title={product.title} />
                    <p className={"text-xl font-semibold my-2"}>${product.price}</p>
                    <div className="flex justify-between items-center">
                      <Button onClick={(event) => {
                        event.preventDefault()
                        addToCart(product)
                      }} type="primary">
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
      </div>
    </div>
  );
};

export default Main;