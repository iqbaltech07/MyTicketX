declare module "midtrans-client" {
  const midtrans: any;
  export = midtrans;
}

interface Window {
  snap: {
    pay: (token: string, options?: Record<string, any>) => void;
  };
}
