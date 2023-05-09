import { CandidateEntity } from "@test-assessment/cms-graphql-api";

export const searchQueryField = ["email", "firstName", "lastName"];
export interface CandidateRowData {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    level: string;
    author: string;
  }
export const transformListCandidates = (data: CandidateEntity[]): CandidateRowData[] => {
    return data.map((item) => {
      const attributes = item.attributes;
      return {
        id: item.id,
        name: `${attributes.firstName} ${attributes.lastName}`,
        email: attributes.email,
        phone: attributes.phone,
        role: attributes.position,
        level: attributes.level,
        author: '---',

      };
    });
  };