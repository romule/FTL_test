import "../../assets/styles/app.css";
import CatLoader from "../../assets/img/cat_loader.gif";
import React, { useEffect, useState, useRef, useCallback } from "react";
import CardOfCats from "../Card";
import Navbar from "../Navbar";

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [cards, setFetcheData] = useState([]);
  const [sort_by, setTypeFilter] = useState(null);
  const [sort_dir, setDirFilter] = useState(null);
  const [page, setPageQuery] = useState(1);
  const [hasNextPage, setNextPage] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetch(
        `https://ftl-cryptokitties.fly.dev/api/crypto_kitties?${
          sort_by ? `sort_by=${sort_by}` : ""
        }${sort_dir ? `&sort_dir=${sort_dir}` : ""}${
          page ? `&page=${page}` : ""
        }`
      );
      const json = await data.json();

      if (json.pagination_info.current_page > 1)
        setFetcheData((oldValue) => [...oldValue, ...json.cats]);
      else setFetcheData(json.cats);

      setNextPage(json.pagination_info.next_page);
    };

    getData().catch(console.error);
    setLoading(false);
  }, [sort_dir, sort_by, page]);

  function handleFilter(event) {
    event ? setTypeFilter(event) : setTypeFilter("");
  }

  function handleSort(eventID) {
    if (!!sort_by) setDirFilter(eventID);
  }

  const observer = useRef();
  const lastCard = useCallback(
    (node) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer?.current?.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPageQuery((prev) => prev + 1);
        }
      });

      if (node) {
        observer?.current?.observe(node);
      }
    },
    [isLoading, hasNextPage]
  );

  // page

  if (cards)
    return (
      <div>
        <Navbar handleFilter={handleFilter} handleSort={handleSort} />
        <div className="main-content">
          {cards.map((item, index) => {
            if (cards.length === index + 1) {
              return <CardOfCats key={index} cat={item} ref={lastCard} />;
            } else {
              return <CardOfCats key={index} cat={item} />;
            }
          })}
        </div>
      </div>
    );
  else
    return (
      <div className="Loader">
        <img width="140px" height="100px" src={CatLoader} alt="Loading..." />
      </div>
    );
}
