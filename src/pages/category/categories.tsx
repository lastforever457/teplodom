import { Card, Col, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories, status } = useSelector((state: any) => state.products);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <div>
      <Typography.Title>Все Категории</Typography.Title>
      <Row gutter={[20, 20]}>
        {categories &&
          categories.map((category: Record<string, any>) => (
            <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
              <Link to={`:${category.slug}`}>
                <Card
                  className={"shadow-lg"}
                  cover={
                    <img
                      src={`https://picsum.photos/300/300?random=${category.id}`}
                      alt={category.name}
                    />
                  }
                >
                  <Card.Meta title={category.name} />
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Categories;
