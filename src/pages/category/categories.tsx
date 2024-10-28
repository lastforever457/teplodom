import { Card, Col, Pagination, Row, Typography } from "antd";
import { ReducerContext } from "../../contexts/reducer-context-provider.tsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocationParams } from "../../hooks/use-location-params.tsx";
import { useRouterPush } from "../../hooks/use-router-push.tsx";

const Categories = () => {
  const context = useContext(ReducerContext);
  const { query } = useLocationParams();
  const { push } = useRouterPush();
  const [categories, setCategories] = useState(context?.state.categories);

  useEffect(() => {
    if (context?.state.status !== "loading") {
      const startIndex = ((Number(query.page) || 1) - 1) * 12;
      const endIndex = startIndex + 12;
      const res = context?.state.categories?.slice(startIndex, endIndex);
      setCategories(res);
    }
  }, [context?.state.status, query.page, context?.state.categories]);

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

  const handlePageChange = (page: number) => {
    push({ query: { page } });
  };

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
      <Pagination
        className={"mt-5"}
        showQuickJumper
        defaultPageSize={12}
        defaultCurrent={Number(query.page) || 1}
        total={state.categories.length}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Categories;
