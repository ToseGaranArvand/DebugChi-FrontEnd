import { DebugIcon, HomeIcon, PublicClassIcon, VipIcon } from "@/components/ui/icons";
import { Earth } from "lucide-react";

export const navigation = [
    {
        id:1,
        title_fa:"خانه",
        title_en:"Home",
        url:"/",
        icon:<HomeIcon />
    },
    {
        id:2,
        title_fa:"دیباگ",
        title_en:"Debug",
        url:"/debug",
        icon:<DebugIcon />
    },
    {
        id:3,
        title_fa:"مشاوره",
        title_en:"Consult",
        url:"/consult",
        icon:<DebugIcon />
    },
    {
        id:4,
        title_fa:"کلاس خصوصی",
        
        title_en:"Private Class",
        url:"/private_class",
        icon:<VipIcon />
    },
    {
        id:5,
        title_fa:"کلاس عمومی",
        title_en:"Public Class",
        url:"/public_class",
        icon:<PublicClassIcon />
    },
    {
        id:6,
        title_fa:"چت روم",
        title_en:"Chat Room",
        url:"/community/main",
        icon:<Earth size={24} color="orange" />
    },
]