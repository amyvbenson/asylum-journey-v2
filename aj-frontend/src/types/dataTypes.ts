interface Ref {
  _ref: string;
  _type: string;
  _key: string;
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
  name: string;
  providers?: { _id: string }[];
  categories?: Ref[];
  resources?: { _id: string }[];
  stages?: Ref[];
}

export interface Service {
  _id: string;
  name: string;
  categories?: Category[];
  dataMaintainer?: string;
  description?: any[];
  endDate?: string;
  events?: any[];
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
  description?: any[];
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
