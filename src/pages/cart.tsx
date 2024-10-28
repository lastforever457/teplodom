import { Button, Card, Col, Row, Typography } from "antd";
import useReducerContext from "../hooks/use-reducer-context.tsx";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useReducerActions } from "../hooks/use-reducer-actions.tsx";

const Cart = () => {
  const { context } = useReducerContext();
  const { state } = context;
  const { removeFromCart} = useReducerActions()

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
                  <Button onClick={()=>{removeFromCart(product.id)}} type="primary">Remove from cart</Button>
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
      <Button type="primary" className="mt-5">Buy All</Button>
    </div>
  );
};

export default Cart;
