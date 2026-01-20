import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      background: "#fafafa",
    }}>
      <Result
        status="404"
        title="404"
        subTitle="Oops! Page not found"
        extra={
          <Link to="/">
            <Button type="primary">Return to Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
