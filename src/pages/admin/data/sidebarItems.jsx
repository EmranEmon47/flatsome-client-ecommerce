import {
  FiGrid,
  FiBox,
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiVolume2,
  FiFileText, // import icon for Orders
} from "react-icons/fi";

export const sidebarItems = [
  { icon: FiGrid, label: "Dashboard" },
  { icon: FiBox, label: "Products" },
  {
    icon: FiFileText, // 🧾 for Manage Orders
    label: "Orders",
  },
  {
    icon: FiUsers,
    label: "Users",
  },
  { icon: FiShoppingBag, label: "Shop" },
  { icon: FiTrendingUp, label: "Income" },
  { icon: FiVolume2, label: "Promote" },
];
