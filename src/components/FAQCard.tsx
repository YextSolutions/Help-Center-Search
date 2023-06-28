// src/components/Card.tsx

import * as React from "react";
import { useState } from 'react';
import { CardProps, DirectAnswer } from "@yext/search-ui-react";
import { provideSearchAnalytics } from "@yext/analytics";
import { Markdown, LexicalRichText } from "@yext/react-components";

//replace with the vertical typescript interface this custom card applies to
import Faq from "../types/faqs";

import { experienceKey, experienceVersion, businessId } from "../common/consts";
import { useSearchState } from "@yext/search-headless-react";

export const searchAnalytics = provideSearchAnalytics({
  experienceKey: experienceKey,
  experienceVersion: experienceVersion,
  businessId: businessId
})

const FAQCard = ({
    result,
    //replace the interface FAQ with the typescript interface of your vertical
  }: CardProps<Faq>) => {
    //pull in the relevant fields from your entity to display on the card
    const data: any = {
        name: result.rawData.question,
        answer: result.rawData.answer,
        // cta1: result.rawData.c_primaryCTA,
        // cta2: result.rawData.c_secondaryCTA
    }

    //replace below with the appropriate vertical key
    const verticalKey = 'faqs'

    //analytics configuration for the card
    const queryId = useSearchState((state)=>state.query.queryId) || "";
    const fireClick = (id:string,label:string)=>{
        searchAnalytics.report({
            type: "CTA_CLICK",
            entityId: id,
            verticalKey: verticalKey,
            searcher: "VERTICAL",
            queryId: queryId,
            ctaLabel: label
        })
    };
    const fireTitle = (id:string)=> {
        searchAnalytics.report({
            type: "TITLE_CLICK",
            entityId: id,
            verticalKey: verticalKey,
            searcher: "VERTICAL",
            queryId: queryId,
        })
    }

    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggle = () => {
      setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="mb-4 justify-between rounded-lg border p-4 text-stone-900 shadow-sm">
          <div className="body flex flex-col">
            <div
              className="title text-lg font-semibold text-blue-700 hover:underline cursor-pointer"
              onClick={handleToggle}
            >
              {data.name}
              <span
                className={`arrow ${isCollapsed ? 'down' : 'up'}`}
                aria-hidden="true"
              ></span>
            </div>
            {!isCollapsed && (
              <div className="description py-2 flex justify-between">
                {data.answer}
              </div>
            )}
          </div>
        </div>
      );
};

export default FAQCard;