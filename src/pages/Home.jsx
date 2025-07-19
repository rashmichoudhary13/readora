// import React, { useState, useEffect } from "react";
// import { useSupabase } from "../context/Supabase";
// import BookCard from "../components/Card";
import HeroSection from "../components/HeroSection";
// import "../style/Home.scss";

const HomePage = () => {
  // const supabase = useSupabase();
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   supabase.listAllBooks().then((data) => setBooks(data));
  // }, []);

  return (
    <main >
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center mt-8">
          <h3 className="text-lg text-gray-600">No books available</h3>
        </div>
      )} */}
      <HeroSection></HeroSection>
      
    </main>
  );
};

export default HomePage;
