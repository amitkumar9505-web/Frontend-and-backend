import { useEffect, useState } from "react";
import Card from "../Components/Card";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // fetching data using axios and async await
    // remember we cannot use async await in useEffect's function
    // ex: useEffect(async() => {
    // const response = await axios.get(/api/.)}, []) ❌

    // But use async await by creating a separate function inside useEffect and call it /or / other way you can use IIFE as below
    // see the semicolon ; before " ;()() " IIFE that is used in production code to make sure other code is not running while IIFE is invoked

    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true); //agar data abhi nahi aya hai loading chahiye
        setError(false); // edge case when error was already true so we set it to false
        // const response = await axios.get("/api/products?search=" + search, {
        //   signal: controller.signal,
        // });

        const response = await axios.get("/api/products");
        console.log(response);
        const dataArr = await response.data;
        console.log(dataArr);

        setProducts(dataArr);
        console.log(products);

        // Jo kuch load hona tha ab tak load ho gya hoga loading nahi chahiye
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request Canceled", error.message);
          return;
        }
        setError(true); // here we set error true when error is catched in catch()
        // agar error aa chuka hai to loading ko false kardo
        setLoading(false);
      }
    })();

    return () => {
      //Cleanup Method to handle axios controller at unmount
      controller.abort();
    };
  }, []);

  // if (error) {
  //   return <h1>Something went Wrong</h1>;
  // }

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }
  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  return (
    <>
      {loading && <h1> Loading ... </h1>}
      {error && <h1> Something went Wrong </h1>}
      <h1>Our Page for simple server API check</h1>

      {/* <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}

      <h2>Number of products: {products.length}</h2>
      <div className="card-container">
        {products.length === 0 ? (
          <p>No data</p>
        ) : (
          products.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              color={item?.data?.color}
              capacity={item?.data?.capacity}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
