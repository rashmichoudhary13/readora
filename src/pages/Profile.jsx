import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/Supabase";
import "../style/Profile.scss";

const Profile = () => {
  const { user, getBooksByUser, deleteBook } = useSupabase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user) {
      getBooksByUser(user.id).then((booksData) => {
        setBooks(booksData);
      });
    }
  }, [user, getBooksByUser]);

  if (!user) return <h1>Please log in</h1>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.user_metadata?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h2 className="books-title">Books Added</h2>
      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.imgURL} alt={book.name} className="book-image" />
              <div className="book-details">
                <h3>{book.name}</h3>
                <div className="book-actions">
                  <button onClick={() => deleteBook(book.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
