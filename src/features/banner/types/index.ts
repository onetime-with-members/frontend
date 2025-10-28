export interface Banner {
  id: number;
  organization: string;
  title: string;
  sub_title: string;
  button_text: string;
  color_code: string;
  image_url: string;
  is_actived: boolean;
  created_date: string;
  link_url: string;
  click_count: number;
}

export interface BarBanner {
  id: number;
  content_kor: string;
  content_eng: string;
  background_color_code: string;
  text_color_code: string;
  is_activated: boolean;
  created_date: string;
  link_url: string;
}
