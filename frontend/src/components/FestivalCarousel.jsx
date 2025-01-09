import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./festival.css";
import SandwichData from "./sandwichData.json"; // Assuming JSON has all the data
import PizzaData from "./Pizza.json"
import BurgerData from "./Burger.json"
import { Link } from "react-router-dom";

// Reusable Carousel Component
const Carousel = ({ title, data }) => {
  const scrollLeft = (id) => {
    const container = document.getElementById(id);
    container.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = (id) => {
    const container = document.getElementById(id);
    container.scrollBy({ left: 250, behavior: "smooth" });
  };

  const containerId = `scrollable-container-${title}`;

  return (
    <div
      className="container py-3 bg-dark text-white position-relative"
      style={{ borderRadius: "10px", overflow: "hidden", marginBottom: "50px" }}
    >
      {/* Section Heading */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="text-uppercase">
          {title} <span className="text-danger">&gt;</span>
        </h6>
      </div>

      {/* Carousel Section */}
      <div className="position-relative">
        {/* Left Button */}
        <button
          className="arrow-btn left-arrow position-absolute start-0 top-50 translate-middle-y"
          onClick={() => scrollLeft(containerId)}
          style={{ zIndex: 10 }}
        >
          <BsChevronLeft />
        </button>

        {/* Cards Container */}
        <div
          id={containerId}
          className="d-flex"
          style={{
            gap: "0.8rem",
            overflowX: "auto",
            scrollBehavior: "smooth",
            padding: "0 1.5rem",
          }}
        >
          {data.map((item, index) => (
            <div
              className="card bg-dark text-white border-secondary"
              style={{
                minWidth: "10rem",
                borderRadius: "12px",
                flex: "0 0 auto",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
              key={index}
            >
              <img
                src={item.thumbnail_url}
                className="card-img-top"
                alt={item.name}
                style={{
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body text-center">
                <h6 className="card-title d-flex " style={{ fontSize: "0.9rem" }}>
                  {item.name}
                </h6>
                <Link to={`/food_recipe_finder/recipe/${item.id}`}>
                  <button className="btn btn-primary btn-sm">Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          className="arrow-btn right-arrow position-absolute end-0 top-50 translate-middle-y"
          onClick={() => scrollRight(containerId)}
          style={{ zIndex: 10 }}
        >
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

// Main Component
const FestivalCarousel = () => {
  // Assuming SandwichData contains data for all categories
  const categories = [
    { title: "Pizza", data: SandwichData },
    { title: "Burger", data: BurgerData },
    { title: "Sandwich", data: PizzaData },
  ];

  return (
    <div>
      {categories.map((category, index) => (
        <Carousel key={index} title={category.title} data={category.data} />
      ))}
    </div>
  );
};

export default FestivalCarousel;
