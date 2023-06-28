// src/components/SearchExperience.tsx

import * as React from "react";
import {
  SearchBar
  } from "@yext/search-ui-react";

import {
  useSearchState
  } from "@yext/search-headless-react";

import UniversalSearch from "./UniversalSearch";
import HelpArticleVerticalSearch from "./HelpArticleSearch";
import FAQVerticalSearch from "./FAQSearch";
import VerticalNav from "./VerticalNav";

const SearchExperience = () => {
  //retrieves the current vertical key
  const currentVertical = useSearchState((state) => state.vertical.verticalKey) ?? "";

  return (
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
          <h1 className="pb-4 text-center text-3xl font-bold text-blue-700">
            Help Center Search
          </h1>
          <SearchBar placeholder="Search Help Center"/>
          <VerticalNav />
          {
            currentVertical === "faqs" ? (<FAQVerticalSearch/>) :
            currentVertical === "help_articles" ? (<HelpArticleVerticalSearch/>) :
            (<UniversalSearch />)
           }
        </div>
      </div>
  );
};

export default SearchExperience;