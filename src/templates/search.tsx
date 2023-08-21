// src/templates/search.tsx

import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";

import SearchExperience from "../components/SearchExperience";

import {
  apiKey,
  experienceKey,
  locale,
  experienceVersion,
} from "../common/consts";
import MainLayout from "../components/MainLayout";
import ComplexHeader from "../components/ComplexHeader";
import Footer from "../components/Footer";

export const getPath: GetPath<TemplateProps> = () => {
  return "search";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    //Update title to match Search starter
    title: `Basic Search`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

export const SEARCHER = provideHeadless({
  apiKey: apiKey,
  // comment in the verticalKey if you are building a vertical-only search experience
  // verticalKey: "REPLACE_ME_VERTICAL_KEY",
  experienceKey: experienceKey,
  locale: locale,
  experienceVersion: experienceVersion,
});

const Search: Template<TemplateRenderProps> = ({ __meta, document }) => {
  return (
    <MainLayout templateData={{ __meta, document }} backgroundColor="#FFFFFF">
      <ComplexHeader
        backgroundColor="#FFFFFF"
        textColor="#000000"
        logo="https://a.mktgcdn.com/p/Y-dxorWO3d3dNLcW0aW6ht5grsUUTyxMwFGzL-4k0GQ/300x300.png"
        link1="/search"
        link2="#"
        link3="#"
        label1="Search"
        label2="Submit Request"
        label3="Contact Us"
        companyScreenReaderText="Yext"
        hoverColor="light"
      />
      <SearchHeadlessProvider searcher={SEARCHER}>
        <SearchExperience />
      </SearchHeadlessProvider>
      <Footer
        label1="Privacy"
        link1="#"
        label2="Terms"
        link2="#"
        label3="Settings"
        link3="#"
        label4="Help"
        link4="#"
        backgroundColor="#FFFFFF"
        textColor="#000000"
        hoverColor="light"
      />
    </MainLayout>
  );
};

export default Search;
