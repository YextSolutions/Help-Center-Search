export interface C_featuredArticles {
	id?: string,
	name?: string,
	slug?: string,
	externalArticlePostDate?: string,
}

export interface Home {
	id: string,
	name: string,
	c_coverPhoto: string,
	c_heading: string,
	c_subHeading: string,
	slug: string,
	c_featuredArticles: C_featuredArticles,
}

export interface HelpArticle {
	id: string,
	name: string,
	slug: string,
	body: string,
	c_helpArticleBodyMarkdown: string,
	shortDescription: string,
	voteCount: number,
	voteSum: number,
	promoted: boolean,
	externalArticlePostDate: string,
	externalArticleUpdateDate: string,
}
