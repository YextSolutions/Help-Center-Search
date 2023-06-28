interface Vertical {
    showInNav: boolean;
    label: string;
    key?: string;
    entityType?: string;
    limit?: number;
}

export const verticals: Vertical[]= [
    {
      //universal vertical
      showInNav: true,
      label: "All",
    },
    {
      showInNav: true,
      label: "Help Articles",
      key: "help_articles",
      entityType: "helpArticle"
    },
    {
        //comment in to add additional vertical
        showInNav: true,
        label: "FAQs",
        key: "faqs",
        entityType: "faq"
      },
]
