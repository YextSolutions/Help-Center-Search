import * as React from "react";
import { CardProps, useCardAnalyticsCallback, useCardFeedbackCallback } from '@yext/search-ui-react';
import { useCallback } from 'react';
import '../styles/resetStyles.css';
import { provideSearchAnalytics } from "@yext/analytics";
import { useState } from 'react';

import { useMemo } from 'react';
import Faq from "../types/faqs";

const builtInCssClasses = {
  container: 'mb-4 justify-between rounded-lg border p-4 text-stone-900 shadow-sm',
  header: 'flex text-neutral-dark',
  title: 'title text-lg font-semibold text-blue-700 hover:underline cursor-pointer',
  thumbsFeedbackContainer: 'flex justify-end mt-4 text-sm text-gray-500 font-medium',
};

import { experienceKey, experienceVersion, businessId } from "../common/consts";
import { useSearchState } from "@yext/search-headless-react";

export const searchAnalytics = provideSearchAnalytics({
  experienceKey: experienceKey,
  experienceVersion: experienceVersion,
  businessId: businessId
})

// change to the field name that contains html string
const htmlFieldName = 'helpstarter_fAQAnswerMarkdown';
// const name = 'test'
// this interface is used to expose the field name containing HTML Content to the card
interface CustomRawDataType {
  name: string,
  description: string,
  [htmlFieldName]: { html: string }
}

function renderHTMLContent(htmlContent: { __html: string } | undefined) {
  if ( htmlContent )
  {
    return <div className="reset-style" dangerouslySetInnerHTML={htmlContent} />;
  }
  return null;
}

export function FAQCard(props: CardProps<CustomRawDataType>): JSX.Element {
  const { result } = props;
  const onClickTitle = useCardAnalyticsCallback(result, 'TITLE_CLICK');
  const cardFeedbackCallback = useCardFeedbackCallback(result);
  const onClick = useCallback(() => {
    cardFeedbackCallback('THUMBS_UP');
  }, [cardFeedbackCallback]);

  const html: string = result.rawData?.[htmlFieldName]?.html;
  const htmlContent = useMemo(() => { return { __html: html }; }, [html]);
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
    <div className={builtInCssClasses.container}>
      <p className={builtInCssClasses.header}>{name}</p>
      <button onClick={handleToggle} className={builtInCssClasses.title}>{result.rawData.name}</button>
      {!isCollapsed && (
              <div className="description py-2 justify-between">
              {renderHTMLContent(htmlContent)}
              </div>
            )}
      <button onClick={onClick} className={builtInCssClasses.thumbsFeedbackContainer}>Feedback</button>
    </div>
  );
}