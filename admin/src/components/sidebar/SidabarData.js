import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    Person,
    HelpOutline,
   
  } from "@material-ui/icons";

export const SidebarData = [
    {
        title: "Home",
        icon: <LineStyle/>,
        link: "/dashboard"
    },
    {
        title: "Donors",
        icon: <Person/>,
        link: "/donors"
    },
    {
        title: "Charity",
        icon: <Report/>,
        link: "/products"
    },
    {
        title: "Helps",
        icon: <HelpOutline/>,
        link: "/helps"
    }
]
