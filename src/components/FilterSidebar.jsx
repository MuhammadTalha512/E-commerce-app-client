import React from "react";
import { Input, Select, Slider } from "antd";

const { Search } = Input;

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="filter-sidebar">
      <h5 className="fw-bold mb-3">Filters</h5>

      {/* CATEGORY */}
      <Select
        value={selectedCategory}
        onChange={setSelectedCategory}
        className="w-100 mb-3"
        size="large"
        options={[
          { value: "All", label: "All Categories" },
          { value: "Men", label: "Men" },
          { value: "Women", label: "Women" },
          { value: "Baby", label: "Baby Collection" },
        ]}
      />

      {/* SEARCH */}
      <Search
        placeholder="Search products..."
        allowClear
        size="large"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
      />

      {/* PRICE RANGE */}
      <h6 className="fw-bold mb-2">Price Range</h6>

      <Slider
        range
        min={0}
        max={5000}
        value={[
            priceRange?.[0] ?? 0,
            priceRange?.[1] ?? 5000
        ]}
        onChange={(value) => setPriceRange(value)}
      />

      <div className="d-flex justify-content-between mb-3">
        <span>Min: {priceRange?.[0] ?? 0}</span>
        <span>Max: {priceRange?.[1] ?? 5000}</span>
      </div>

      {/* SORT */}
      <Select
        value={sortOption}
        onChange={setSortOption}
        className="w-100"
        size="large"
        options={[
          { value: "default", label: "Sort By" },
          { value: "priceLowHigh", label: "Price: Low to High" },
          { value: "priceHighLow", label: "Price: High to Low" },
          { value: "topRated", label: "Top Rated" },
          { value: "newest", label: "Newest" },
        ]}
      />

      {/* RESPONSIVE STYLE */}
      <style jsx>{`
        .filter-sidebar {
          width: 100%;
          max-width: 260px;
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06);
          height: fit-content;
          position: sticky;
          top: 90px;
        }

        @media (max-width: 768px) {
          .filter-sidebar {
            position: relative !important;
            top: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;
