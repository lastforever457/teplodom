import { Button, Card, Col, Row, Typography } from "antd";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  addToFavorite,
  removeFromFavorite,
} from "../../redux/productsSlice.tsx";

const Products = () => {
  const { status, products } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <div>
      <div className="flex justify-between mt-5">
        <Typography.Title level={2}>Все Товары</Typography.Title>
        <Link to={"filter"}>
          <Button type="primary">Filter</Button>
        </Link>
      </div>
      <div className="products">
        <Row gutter={[16, 26]}>
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
                        onClick={() => dispatch(addToCart(product))}
                        type="primary"
                      >
                        Add to cart
                      </Button>
                      {product.isSaved ? (
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(removeFromFavorite(product.id));
                          }}
                        >
                          <MdOutlineFavorite />
                        </Button>
                      ) : (
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(addToFavorite(product.id));
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
  );
};

export default Products;
