import React, {useState, useEffect} from "react";
import Categories from "./components/Categories";
import Quote from "./components/Quote";
import {getCategories, getQuote} from "./quotesService";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [quote, setQuote] = useState({});
  
  //Let's set our category so we can use it to fetch our quotes.
  useEffect(() => {
    getCategories().then(cats => {
      if(cats.length > 0){
        setCategories(cats);
        setSelected(cats[0]);
      }
    });
  }, []);

  //When the 'selected' is set, fetch a quote
  useEffect(() => {
   selected && getQuote(selected).then(q => setQuote(q));
  }, [selected]);

  //Now let's fetch a new quote every 5 seconds.
  useEffect(() => {
    let timer = setInterval(() => {
      getQuote(selected).then(q => setQuote(q));
    }, 5000);
    
    return () => clearInterval(timer);
  }, [selected])

  return (
    <div className="quote-master">
      <Categories
        categories={categories}
        selected={selected}
        onSelected={category => setSelected(category)}
      />
      {quote && <Quote quote={quote.quote} author={quote.author} />}
    </div>
  );
};

export default App;
