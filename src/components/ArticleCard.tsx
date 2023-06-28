// src/components/Card.tsx

import * as React from "react";
import { CardProps, DirectAnswer } from "@yext/search-ui-react";
import { provideSearchAnalytics } from "@yext/analytics";
import { Markdown, LexicalRichText } from "@yext/react-components";

//replace with the vertical typescript interface this custom card applies to
import HelpArticle from "../types/help_articles";

import { experienceKey, experienceVersion, businessId } from "../common/consts";
import { useSearchState } from "@yext/search-headless-react";

export const searchAnalytics = provideSearchAnalytics({
  experienceKey: experienceKey,
  experienceVersion: experienceVersion,
  businessId: businessId
})

const articleCard = ({
    result,
    //replace the interface FAQ with the typescript interface of your vertical
  }: CardProps<HelpArticle>) => {
    //pull in the relevant fields from your entity to display on the card
    const data: any = {
        name: result.rawData.name,
        answer: result.rawData.body.slice(0,500),
        landingPageUrl: result.rawData.slug,
        category: result.rawData.externalArticleUpdateDate,
        lexical: result.rawData.c_lexicalRichText
        // cta1: result.rawData.c_primaryCTA,
        // cta2: result.rawData.c_secondaryCTA
    }

    //replace below with the appropriate vertical key
    const verticalKey = 'help_articles'

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

    return (
        <div className="mb-4 justify-between rounded-lg border p-4 text-stone-900 shadow-sm">
            <div className="body flex flex-col">
                {data.landingPageUrl && (
                    <a href={`${data.landingPageUrl}`} target = "_blank" rel="noreferrer">
                        <div className="title text-lg font-semibold text-blue-700 hover:underline" onClick ={() => fireTitle(result.id || "")}>
                            {data.name}
                        </div>
                    </a>
                )}
                <div className= "category-label flex gap-1 mt-2">
                        {data.category && (
                            <div className="flex rounded bg-gray-600 px-1 text-sm text-gray-100">
                                Updated: {`${data.category}`}
                            </div>
                        )}
                    </div>
                <div className="description py-2 flex justify-between">
                    <LexicalRichText
                        serializedAST={JSON.stringify(data.lexical.json)}
                    />
                </div>
            </div>
        </div>
    )
};

export default articleCard;