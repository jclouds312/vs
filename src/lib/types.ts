export type PhoneSpec = {
  display: string;
  camera: string;
  battery: string;
  processor: string;
  storage: string;
  ram: string;
  is5G: boolean;
};

export type Phone = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: PhoneSpec;
};
