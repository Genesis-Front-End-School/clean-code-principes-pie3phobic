import React, { useState } from "react";
import InfoCard from "../components/InfoCard";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { paginate } from "../helpers/paginate";
import ApiClient from "./api/fetchData";

function Courses({ data }) {
  const coursesData = data.courses;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 20, behavior: "smooth" });
  };

  const paginatedPosts = paginate(coursesData, currentPage, pageSize);
  return (
    <div>
      <Header />
      <div className="flex flex-col">
        {paginatedPosts.map((post) => (
          <InfoCard key={post.id} {...post} />
        ))}
        <Pagination
          items={coursesData.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Courses;
export async function getServerSideProps() {
  const apiClient = await ApiClient.getInstance();
  const { data } = await apiClient.fetchData();
  return { props: { data } };
}
