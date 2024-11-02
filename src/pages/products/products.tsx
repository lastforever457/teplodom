import { useEffect, useState } from "react";
import { useLocationParams } from "../../hooks/use-location-params.tsx";
import { Button, Card, Col, Pagination, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { useRouterPush } from "../../hooks/use-router-push.tsx";
import useReducerContext from "../../hooks/use-reducer-context.tsx";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useReducerActions } from "../../hooks/use-reducer-actions.tsx";

const Products = () => {
  const { context } = useReducerContext();
  const { state } = context;
  const { query } = useLocationParams();
  const { push } = useRouterPush();
  const { addToCart, addToFavorite, removeFromFavorite } = useReducerActions();

  const [products, setProducts] = useState(state.products);

  useEffect(() => {
    if (state.status !== "loading") {
      const startIndex = ((Number(query.page) || 1) - 1) * 12;
      const endIndex = startIndex + 12;
      const res = state.products?.slice(startIndex, endIndex);
      setProducts(res);
    }
  }, [state.status, query.page, state.categories]);

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "error") {
    return <div>Error loading data. Please try again.</div>;
  }

  const handlePageChange = (page: number) => {
    push({ query: { page } });
  };

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
                      <Button onClick={() => addToCart(product)} type="primary">
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
        <Pagination
          className={"my-5"}
          showQuickJumper
          defaultPageSize={12}
          defaultCurrent={Number(query.page) || 1}
          total={state.products.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
