export interface IBanners {
  id: number;
  image: string;
  alt: string;
}

export interface IEvents {
  id: string; 
  title: string;
  slug: string;
  description: string;
  thumb: string;
  date: string;
  time: string;
}

export interface HistoryItem {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface GeminiRequestBody {
  geminiModel: string;
  content: string;
  geminiHistory?: HistoryItem[];
}

export interface GeminiSuccessResponse {
  body: {
    choices: Array<{
      message: {
        content: any;
      };
    }>;
  };
}

export interface GeminiErrorResponse {
  error: string;
}
