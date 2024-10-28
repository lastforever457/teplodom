import { Button, Card, Col, Row, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { ReducerContext } from "../contexts/reducer-context-provider.tsx";
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";

const Saved = () => {
  const context = useContext(ReducerContext);
  const [savedProducts, setSavedProducts] = useState<any[]>([]);
  useEffect(() => {
    const filteredProducts =
      context?.state.products.filter((product) => product.isSaved) || [];
    setSavedProducts(filteredProducts);
  }, [context?.state.products]);

  if (!context) {
    return <div>Error: Context not available</div>;
  }

  return (
    <div>
      <Typography.Title>Избранные товары</Typography.Title>
      <div className="saved">
        <Row gutter={[16, 16]}>
          {savedProducts.length > 0 ? (
            savedProducts.map((product: Record<string, any>, index: number) => (
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
                  <p className={"my-3 text-xl font-bold"}>${product.price}</p>
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
                        <FaTrashCan />
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <div>No products found.</div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Saved;
