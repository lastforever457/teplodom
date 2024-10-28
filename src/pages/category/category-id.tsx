import { useParams } from "react-router-dom";
import useFetchWithQueries from "../../hooks/use-fetch-with-queries.tsx";
import { useContext, useEffect, useState } from "react";
import { ReducerContext } from "../../contexts/reducer-context-provider.tsx";
import { Button, Card, Col, Row, Tag, Typography } from "antd";
import { IoCartOutline } from "react-icons/io5";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const CategoryId = () => {
  const { slug } = useParams();
  const { fetchWithQueries } = useFetchWithQueries();
  const [data, setData] = useState<any>();
  const context = useContext(ReducerContext);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchWithQueries(
        `/products/category/${slug?.slice(1)}`,
      );
      setData(res);
    };

    fetch();
  }, []);

  if (!data && !data?.products) {
    return <div>Loading...</div>;
  }

  if (!context) {
    return <div>Error: Context not available</div>;
  }

  const { state } = context;

  if (state.status === "loading") {
    return <div>Loading...</div>;
  }

  if (state.status === "error") {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <div>
      <div>
        <Typography.Title className={"capitalize"}>
          {slug?.slice(1) === ":" ? slug?.slice(1) : slug}
        </Typography.Title>
      </div>
      <div className="">
        <Row gutter={[20, 20]}>
          {data.products.map((product: Record<string, any>, index: number) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card
                className="cursor-pointer hover:shadow-md"
                cover={
                  <img
                    className="h-[250px] bg-contain bg-center object-contain"
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.title || "Product"}
                  />
                }
              >
                <Card.Meta title={product.title || "Product"} />
                <div className="flex">
                  <Tag className="mt-3 bg-red-500 text-white">
                    <del>${product.discountPercentage}</del>
                  </Tag>
                </div>
                <p className={"mb-3 text-xl font-bold"}>${product.price}</p>
                <div className="flex justify-between items-center text-white">
                  <Button
                    onClick={() => {
                      context?.dispatch({
                        type: "ADD_TO_CART",
                        payload: product,
                      });
                    }}
                    className={""}
                    style={{ background: "#ffb12a" }}
                  >
                    <IoCartOutline />В корзину
                  </Button>
                  {!product.isSaved ? (
                    <Button
                      onClick={() => {
                        context?.dispatch({
                          type: "ADD_TO_FAVORITE",
                          payload: product.id,
                        });
                      }}
                      shape={"default"}
                      className={"p-2"}
                      style={{ background: "#ffb12a" }}
                    >
                      <MdFavoriteBorder />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        context?.dispatch({
                          type: "REMOVE_FROM_FAVORITE",
                          payload: product.id,
                        });
                      }}
                      shape={"default"}
                      className={"p-2"}
                      style={{ background: "#ffb12a" }}
                    >
                      <MdFavorite />
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategoryId;
