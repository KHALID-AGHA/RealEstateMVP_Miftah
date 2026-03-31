export const PROPERTY_TYPES = [
  { id: "1", label: "Home", value: "Home" },
  { id: "2", label: "Apartment", value: "Apartment" },
  { id: "3", label: "Land", value: "Land" },
  { id: "4", label: "Farm", value: "Farm" },
  { id: "5", label: "Floor", value: "Floor" },
];
export const PAGE_SIZE = 2;
export const CURRENCIES = ["SYP", "USD"];

export const TYPE_IMAGES: Record<string, any> = {
  Home: require("@/assets/images/Home.jpg"),
  Apartment: require("@/assets/images/Apartment.jpg"),
  Land: require("@/assets/images/Land.jpg"),
  Farm: require("@/assets/images/Farm.jpg"),
  Floor: require("@/assets/images/Floor.jpg"),
  Default: require("@/assets/images/Home.jpg"),
};

export const ICON_COLOR = "#13cb7b";
export const TEXT_COLOR = "#1A1A1A";
