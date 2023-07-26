export interface HelpArticle {
	id: string,
	name: string,
	slug: string,
	body: string,
	c_helpArticleBodyMarkdown: any,
	shortDescription: string,
	voteCount: number,
	voteSum: number,
	promoted: boolean,
	externalArticlePostDate: string,
	externalArticleUpdateDate: string,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface C_featuredArticles {
	id?: string,
	name?: string,
	slug?: string,
	externalArticlePostDate?: string,
}

export interface Home {
	id: string,
	name: string,
	c_coverPhoto: ComplexImage,
	c_heading: string,
	c_subHeading: string,
	slug: string,
	c_featuredArticles: C_featuredArticles[],
}
