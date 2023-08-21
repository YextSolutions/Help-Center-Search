/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding stream document stream document (based on the filter).
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import "../index.css";
import { Markdown, LexicalRichText } from "@yext/react-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import MainLayout from "../components/MainLayout";
import ComplexHeader from "../components/ComplexHeader";
import Footer from "../components/Footer";

/**
 * Required when Knowledge Graph Stream is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "helpArticle",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "name",
      "slug",
      "helpstarter_helpArticleBodyMarkdown",
      "voteCount",
      "voteSum",
      "promoted",
      "externalArticlePostDate",
      "externalArticleUpdateDate",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["helpArticle"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ?? document.name;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    // tags: [
    //   {
    //     type: "meta",
    //     attributes: {
    //       name: "description",
    //       content: "Looking for a new career opportunity? Discover our Yext career opportunities, offering a wide range of exciting roles and positions. Explore our diverse listings and find the perfect job that matches your skills and aspirations. Join our team and unlock your full potential today!",
    //     },
    //   },
    //   {
    //     type: "link",
    //     attributes: {
    //       rel: "shortcut icon",
    //       type: "image/png",
    //       href: Favicon,
    //     },
    //   },
    // ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 */

const HelpArticlePage: Template<TemplateProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}) => {
  const {
    name,
    helpstarter_helpArticleBodyMarkdown,
    voteCount,
    voteSum,
    promoted,
    externalArticlePostDate,
    externalArticleUpdateDate,
  } = document;

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
      <div className="prose-lg max-w-5xl mx-auto">
        <div className="p-8 my-6 mx-12">
          <h1 className="mb-4">{name}</h1>
          {voteCount !== null && voteSum !== null && (
            <div className="flex items-center mb-4">
              <span className="mr-2 text-gray-500">{voteCount} Votes</span>
              <span className="text-gray-500">|</span>
              <span className="ml-2 text-gray-500">
                Total Vote Sum: {voteSum}
              </span>
            </div>
          )}
          {promoted && (
            <div className="mb-4 p-2 bg-green-500 text-white font-bold">
              Promoted
            </div>
          )}
          <Markdown content={helpstarter_helpArticleBodyMarkdown.markdown} />
          <p className="text-sm mt-4 text-gray-500">
            Original Article Posted: {externalArticlePostDate}
          </p>
          <p className="text-sm text-gray-500">
            Article Last Updated: {externalArticleUpdateDate}
          </p>
        </div>
      </div>
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

export default HelpArticlePage;
