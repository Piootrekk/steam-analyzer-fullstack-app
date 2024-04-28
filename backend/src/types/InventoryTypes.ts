export type Assets = { classid: string; amount: string };
export type Item = {
  classid: string;
  market_hash_name: string;
  icon_url: string;
  name_color: string;
  marketable: number;
};

export type ItemsResponse = {
  assets?: Assets[];
  descriptions?: Item[];
  total_inventory_count: number;
  success: boolean | number;
  rwgrsn: number;
};
