export type Package = {
  name: string;
  price: number;
  invoiceDate: string;
  status: string;
};

export type ButtonPropTypes = {
  label: string;
  link?: string;
  customClasses?: string;
  onClick?: () => void;  // Ajout de la prop onClick
};
