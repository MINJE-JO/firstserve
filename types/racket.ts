export interface Racket {
    id: string;
    brand: string;
    model: string;
    weight: number;
    balance: number;
    swingweight: number;
    stiffness: number;
    power: number;
    control: number;
    spin: number;
    stability: number;
    comfort: number;
    maneuverability: number;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface RacketRecommendation {
    id: string;
    session_id: string;
    racket_id: string;
    score: number;
    created_at: string;
  }