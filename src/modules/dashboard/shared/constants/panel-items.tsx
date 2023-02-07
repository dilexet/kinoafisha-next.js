import { dashboard } from "@/modules/shared/constants/app-routes";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import WeekendIcon from "@mui/icons-material/Weekend";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

export const PanelItems = [
  {
    name: "User management",
    href: dashboard.Users,
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Movie management",
    href: dashboard.Movies,
    icon: <MovieCreationIcon />,
  },
  {
    name: "Cinema management",
    href: dashboard.Cinemas,
    icon: <TvIcon />,
  },
  {
    name: "Hall management",
    href: dashboard.Halls,
    icon: <WeekendIcon />,
  },
  {
    name: "Session management",
    href: dashboard.Sessions,
    icon: <SmartDisplayIcon />,
  },
];
