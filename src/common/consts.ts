import { UniversalLimit } from "@yext/search-headless-react";

//Replace with Your Yext Business ID
export const businessId = 4049104;
//Replace with Your Search Experience API Key
export const apiKey = "74c5ac5783e783f9f54a430af3300591";
//Replace with Your Search Experience experience key
export const experienceKey = "answers-help-site";
//Replace with Your Search Experience locale
export const locale = "en";
//Replace with Your Search Experience versopm
export const experienceVersion = "PRODUCTION";

export const additionalQueryParams: any = {
      "source": "search-basic"
    };

//set universal result limits for each vertical
export const UNIVERSAL_LIMITS: UniversalLimit = {
  help_articles: 5,
  //add additional vertical limits for universal search below, make sure to assign the correct vertical key
  // vertical2: 5,
  // vertical3: 5
}
