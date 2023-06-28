export default interface HelpArticle {
	id: string,
	name: string,
	slug: string,
	body: string,
	c_lexicalRichText: any,
	shortDescription: string,
	voteCount: number,
	voteSum: number,
	promoted: boolean,
	externalArticlePostDate: string,
	externalArticleUpdateDate: string,
}
