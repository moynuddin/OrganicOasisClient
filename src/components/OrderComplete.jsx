import { useSearchParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
const OrderComplete = () => {
  const searchQuery = useSearchParams()[0];
  const navigate = useNavigate();
  const ref = searchQuery.get("ref");

  const handleNavigation = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <h1>OrderComplete</h1>
      <p>Order ID {ref}</p>
      <button
        style={{
          backgroundColor: "green",
          padding: "10px",
          color: "white",
          border: "none",
          outline: 0,
          cursor: "pointer",
        }}
        onClick={handleNavigation}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderComplete;
