import React, { useState, useEffect } from "react";
import {useSupabase} from "../context/Supabase";
import BookCard from "../components/Card"; // Assuming this shows book info
import "../style/Home.scss";

const HomePage = () => {
  const supabase = useSupabase();
  
  const [books, setBooks] = useState([]);

  useEffect(() => {
    supabase.listAllBooks().then((data) => setBooks(data));
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
