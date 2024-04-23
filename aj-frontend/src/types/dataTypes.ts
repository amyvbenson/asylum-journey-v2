interface Ref {
  _ref: string;
  _type: string;
  _key: string;
}

export interface BlockLike {
  _key: string;
  _type: string;
  children: {
    _key: string;
    _type: "span";
    text: string;
    /**
     * Non-explicit strings will be the key of
     * one of the {@property markDefs}.
     */
    marks: (
      | "underline"
      | "strong"
      | "em"
      | "code"
      | "strike-through"
      | string
    )[];
  }[];
}

interface Slug {
  _type: "slug";
  current: string;
}

export interface Category {
  _id: string;
  name: string;
  position?: number;
}

export interface Stage {
  _id: string;
  name: string;
}

export interface ServiceSummary {
  _id: string;
  slug: Slug;
  name: string;
  description: BlockLike[];
  providers?: { _id: string }[];
  categories?: Ref[];
  resources?: { _id: string }[];
  stages?: Ref[];
}

export interface Service {
  _id: string;
  slug: Slug;
  name: string;
  categories?: Category[];
  dataMaintainer?: string;
  description: BlockLike[];
  endDate?: string;
  events?: BlockLike[];
  externalReviews?: string;
  lastReviewComments?: string;
  lastReviewDate?: string;
  lastReviewedBy?: string;
  providers?: Provider[];
  resources?: Resource[];
  stages?: Stage[];
}

export interface Provider {
  _id: string;
  name: string;
  description: BlockLike[];
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  contactName?: string;
  address?: string;
  postcode?: string;
  lastReviewDate?: string;
  lastReviewedBy?: string;
  lastReviewComments?: string;
  nextReviewDate?: string;
  nextReviewComments?: string;
  providerContact?: string;
}

export interface Resource {
  _id: string;
  name: string;
  url?: string;
  expiryDate?: string;
  comments?: string;
  lastReviewDate?: string;
  lastReviewedBy?: string;
  lastReviewComments?: string;
  nextReviewDate?: string;
  nextReviewComments?: string;
}

export interface SearchResult {
  _id: string;
  _type: string;
  slug: Slug;
  name: string;
  description?: BlockLike[];
  url?: string;
}
