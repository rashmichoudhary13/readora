import React, { useState, useEffect } from "react";
import { supabase } from "../context/SupabaseProvider";
import BookCard from "../components/Card"; // Assuming this shows book info
import "../style/Home.scss";

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from("books").select("*");

      if (error) {
        console.error("Error fetching books:", error.message);
      } else {
        setBooks(data);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container main">
      <div className="row sub">
        {books.map((book) => (
          <div key={book.id} className="col-md-3 mb-3">
            <BookCard {...book} />
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <center>
          <h3>No books available</h3>
        </center>
      )}
    </div>
  );
};

export default HomePage;
