import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useState, useEffect } from "react";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

//using ContextAPI
const SupabaseContext = createContext(null);

//customHook
export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Get the current user (if already logged in)
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // 2. Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth change event:", event);
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    // 3. Cleanup on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  //  console.log("user: ",user);
  //  console.log("Name:", user?.user_metadata?.name || "No user or name found");

  const handleCreateNewListing = async (
    name,
    author,
    rdate,
    coverPic,
    desc,
    bookPdf,
    trope
  ) => {
    const coverpath = `${Date.now()}-${coverPic.name}`;
    const pdfpath = `${Date.now()}-${bookPdf.name}`;

    const { data: imageUpload, error: imageError } = await supabase.storage
      .from("readhive")
      .upload(`image/${coverpath}`, coverPic);

    if (imageError) throw imageError;

    const { data: pdfUpload, error: pdfError } = await supabase.storage
      .from("readhive")
      .upload(`pdfs/${pdfpath}`, bookPdf);

    if (pdfError) throw pdfError;

    const { data: imageURL } = await supabase.storage
      .from("readhive")
      .getPublicUrl(`image/${coverpath}`);

    console.log("Image Url: ", imageURL.publicUrl)

    const { data: pURL } = await supabase.storage
      .from("readhive")
      .getPublicUrl(`pdfs/${pdfpath}`);

    const { data, error } = await supabase.from("books").insert([
      {
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
      },
    ]);
    if (error) {
      console.error("Error inserting book: ", error);
    } else {
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

  const getBookById = async(id) => {
    const {data, error} = await supabase.from("books")
    .select("*")
    .eq("id",id)
    .single();
    return data
  }

  return (
    <SupabaseContext.Provider value={{ handleCreateNewListing, listAllBooks,getBookById}}>
      {props.children}
    </SupabaseContext.Provider>
  );
};


