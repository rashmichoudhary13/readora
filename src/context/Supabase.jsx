import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useState, useEffect } from "react";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

const SupabaseContext = createContext(null);

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth change event:", event);
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleCreateNewListing = async (name, author, rdate, coverPic, desc, bookPdf, trope) => {
    const coverpath = `${Date.now()}-${coverPic.name}`;
    const pdfpath = `${Date.now()}-${bookPdf.name}`;

    const { error: imageError } = await supabase.storage.from("readhive").upload(`image/${coverpath}`, coverPic);
    if (imageError) throw imageError;

    const { error: pdfError } = await supabase.storage.from("readhive").upload(`pdfs/${pdfpath}`, bookPdf);
    if (pdfError) throw pdfError;

    const { data: imageURL } = await supabase.storage.from("readhive").getPublicUrl(`image/${coverpath}`);
    const { data: pURL } = await supabase.storage.from("readhive").getPublicUrl(`pdfs/${pdfpath}`);

    const { error } = await supabase.from("books").insert([{
      name,
      author,
      rdate,
      trope,
      desc,
      imgURL: imageURL.publicUrl,
      pdfURL: pURL.publicUrl,
      userID: user.id,
      userEmail: user.email,
      displayName: user.user_metadata.name,
    }]);

    if (error) {
      alert(error.message)
      console.error("Error inserting book: ", error.message);
    } else {
      alert("Successfully inserted the book")
      console.log("Book successfully added.");
    }
  };

  const listAllBooks = async () => {
    const { data, error } = await supabase.from("books").select("*");
    if (error) {
      console.error("Error fetching books:", error.message);
    }
    return data;
  };

  const getBookById = async (id) => {
    const { data, error } = await supabase.from("books").select("*").eq("id", id).single();
    return data;
  };

  const getBooksByUser = async (userID) => {
    const { data, error } = await supabase.from("books").select("*").eq("userID", userID);
    if (error) {
      console.error("Error fetching user's books:", error.message);
    }
    return data;
  };

  const deleteBook = async (bookId) => {
    const { error } = await supabase.from("books").delete().eq("id", bookId);
    if (error) {
      alert(error)
      console.error("Error deleting book:", error.message);
    } else {
      alert("Deleted the book")
      console.log("Book deleted successfully");
    }
  };

  return (
    <SupabaseContext.Provider
      value={{
        handleCreateNewListing,
        listAllBooks,
        getBookById,
        getBooksByUser,
        deleteBook,
        user,
      }}>
      {children}
    </SupabaseContext.Provider>
  );
};
