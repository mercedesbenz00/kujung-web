import { useWindowSize } from "@vueuse/core";
export const IMAGE_FOO_URL = "https://picsum.photos/800/500";
export const IMAGE_FOO_URL_SMALL =
  "https://i.postimg.cc/hGZHpvqt/00-resize-580x350.jpg";

export const PRIVACY_TERM_URL =
  "https://kujungmaru.oopy.io/afa86f9f-798e-4289-bebf-35dc3c71ebef";

export const SCREEN_WIDTH = useWindowSize().width;
export const SCREEN_HEIGHT = useWindowSize().height;

export const SESSION_PARAMS = {
  ACCESS_TOKEN: "access_token",
  PROFILE_INFO: "profile_info",
  LOCATION_PERMITTED: "location_permitted",
};

export const LOCAL_STORAGE_PARAMS = {
  RECENT_KEYWORD: "recent_keyword",
};

export const CATEGORY_PRICE_LIST = [
  { name: "강마루", minPrice: 125000, maxPrice: 190000 },
  { name: "천연", minPrice: 175000, maxPrice: 200000 },
  { name: "프레스티지", minPrice: 190000, maxPrice: 200000 },
  { name: "원목", minPrice: 275000, maxPrice: 340000 },
  { name: "대리석", minPrice: 155000, maxPrice: 180000 },
  { name: "패턴", minPrice: 0, maxPrice: 0 }, // 0 이면 가격문의
  { name: "믹스매치", minPrice: 0, maxPrice: 0 }, // 0 이면 가격문의
];

export const BRAND_SUBMENU_LIST = [
  {
    title: "브랜드 스토리",
    title_route: "story",
    desc: "대한민국 프리미엄 마루 대표 브랜드 \n구정마루의 스토리입니다. ",
    img: "/img/brand/menu/story.png",
    children: [
      {
        title: "제조의 장인",
        title_route: "craftsmanship",
      },
      {
        title: "구정, 그리고 시간의 가치",
        title_route: "kujungTime",
      },
      {
        title: "자연 그대로의 아름다움",
        title_route: "natureBeauty",
      },
    ],
  },
  {
    title: "지속 가능한 경영",
    title_route: "esg",
    desc: "구정마루는 지구와 미래 세대를 위해\n아름다운 약속을 실천합니다.",
    img: "/img/brand/menu/esg.png",
    children: [
      {
        title: "지구를 위한 노력",
        title_route: "earthEffort",
      },
      {
        title: "우리의 공헌",
        title_route: "contribution",
      },
      {
        title: "함께하는 책임",
        title_route: "responsibility",
      },
    ],
  },
  {
    title: "전시장 안내",
    title_route: "showroom",
    desc: "가까운 구정마루 쇼룸을 안내해 드립니다.",
    img: "/img/brand/menu/gallery.png",
    children: [
      {
        title: "본사 쇼룸 찾아오시는길",
        title_route: "headquarters_showroom",
      },
      {
        title: "전국 대리점 쇼룸",
        title_route: "agency-showroom",
      },
    ],
  },
  {
    title: "ART WORK",
    title_route: "artwork",
    desc: "구정마루가 진행한 컨벤션, 아티스트 및 브랜드\n콜라보레이션의 세계로 초대합니다.",
    img: "/img/brand/menu/artwork.png",
    children: [
      {
        title: "컨벤션",
        title_route: "artwork?type=컨벤션",
      },
      {
        title: "아티스트",
        title_route: "artwork?type=아티스트",
      },
      {
        title: "브랜드",
        title_route: "artwork?type=브랜드",
      },
    ],
  },
];

export const PRODUCT_SUBMENU_LIST = [
  {
    title: "제품 소개",
    title_route: "",
    desc: "구정마루의 다양한 브랜드, 수종, 패턴의 마루를\n확인하실 수 있습니다.",
    img: "/img/product/menu/introduction.png",
    children: [],
  },
  {
    title: "인증서 안내",
    title_route: "certificate",
    desc: "프리미엄 마루 대표 브랜드 구정마루의\n제품 인증서를 확인하실 수 있습니다.",
    img: "/img/product/menu/certification.png",
    children: [],
  },
  {
    title: "카탈로그 및 샘플북",
    title_route: "catalogue",
    desc: "구정마루 제품 카탈로그, 샘플북, 시공사례를 엮은\n룩북을 보실 수 있습니다.",
    img: "/img/product/menu/catalogue.png",
    children: [
      {
        title: "카탈로그",
        title_route: "catalogue?type=카탈로그",
      },
      {
        title: "샘플북",
        title_route: "catalogue?type=샘플북",
      },
      {
        title: "룩북",
        title_route: "catalogue?type=룩북",
      },
    ],
  },
  {
    title: "마루 선택 가이드",
    title_route: "guide",
    desc: "구정마루가 좋은 마루를 고르는 방법을\n고객 맞춤형으로 안내해드립니다",
    img: "/img/product/menu/all_products.png",
    children: [
      {
        title: "좋은 마루 고르는 법",
        title_route: "select-guide",
      },
      {
        title: "마루 추천",
        title_route: "recommend-products",
      },
      // {
      //     title: "마루 비교함",
      //     title_route: "catalogue?type=룩북",
      // },
    ],
  },
];

export const CONSTRUCTION_SUBMENU_LIST = [
  {
    title: "온라인집들이",
    title_route: "online",
    desc: "구정마루를 통해 변신한 트렌디한 공간을 소개합니다.",
    img: "/img/construction-ex/menu/online_ex.png",
    children: [],
  },
  {
    title: "이달의 랜덤 집들이",
    title_route: "random",
    desc: "구정마루 고객들이 직접 선정한 이달의 인기 집들이를\n소개합니다.",
    img: "/img/construction-ex/menu/random_ex.png",
    children: [],
  },
];

export const SMARTSERVICE_SUBMENU_LIST = [
  {
    title: "스마트 케어 서비스란",
    title_route: "smart-care",
    desc: "살면서 마루를 교체할 수 있는 올인원 서비스를\n자세히 안내해 드립니다.",
    img: "/img/smartservice/menu/smart-care.png",
    children: [],
  },
  {
    title: "스마트 케어 서비스 신청",
    title_route: "smart-care-request",
    desc: "올인원 서비스인 스마트 케어 서비스를\n신청하실 수 있습니다.",
    img: "/img/smartservice/menu/smart-as.png",
    children: [],
  },
  {
    title: "스마트 케어 시공사례",
    title_route:
      "https://blog.naver.com/PostList.naver?blogId=kujungmaru11&from=postList&categoryNo=97",
    desc: "구정마루 스마트 케어의 실제 시공 사례를\n만나보실 수 있습니다.",
    img: "/img/smartservice/menu/smart-ex.png",
    children: [],
  },
];

export const SERVICE_SUBMENU_LIST = [
  {
    title: "공지사항",
    title_route: "notice",
    desc: "구정마루의 최신 소식 및 공지 사항을 확인하실 수 있습니다.",
    img: "/img/service/menu/notice.png",
    children: [],
  },
  {
    title: "견적내기",
    title_route: "estimate",
    desc: "예상 시공 견적을 빠르고 간편하게 확인하실 수 있습니다.",
    img: "/img/service/menu/estimate.png",
    children: [],
  },
  {
    title: "이벤트",
    title_route: "event",
    desc: "구정마루에서 진행하고 있는\n다양한 이벤트를 직접 확인하실 수 있습니다.",
    img: "/img/service/menu/event.png",
    children: [],
  },
  {
    title: "구정 미디어",
    title_route: "media",
    desc: "최신 인테리어 트렌드 및 \n마루 제품 관리 방법을 만나 보실 수 있습니다.",
    img: "/img/service/menu/media.png",
    children: [
      {
        title: "인테리어 트렌드",
        title_route: "?type=interior",
      },
      {
        title: "제품 관리법",
        title_route: "?type=product_care",
      },
    ],
  },
  {
    title: "고객센터",
    title_route: "custom-center",
    desc: "FAQ, 특판 문의, 부정부패 신고 등 \n구정마루 고객 센터입니다.",
    img: "/img/service/menu/custom_center.png",
    children: [
      {
        title: "자주 묻는 질문",
        title_route: "faq",
      },
      {
        title: "부정부패 신고",
        title_route: "report",
      },
      {
        title: "특판 문의",
        title_route: "sales-inquiry",
      },
      {
        title: "제품 A/S 서비스",
        title_route: "smart-as",
      },
    ],
  },
  {
    title: "포인트몰",
    title_route: "point-mall",
    desc: "구정마루 회원에게 드리는 특별한 혜택!\n포인트 몰에서 혜택을 확인하실 수 있습니다.",
    img: "/img/service/menu/point_mall.png",
    children: [],
  },
];

export enum HouseEntity {
  ONLINE = "online",
  EXPERT = "expert",
}

export enum OnlineHouseStatus {
  WAITING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

export enum QuestionStatus {
  WAITING = 0,
  COMPLETED = 1,
  REJECTED = 2,
}

export enum EventStatus {
  ALL = 0,
  PROGRESS = 1,
  STANDBY = 2,
  FINISHED = 3,
}

export enum FileCategoryType {
  OnlineHouse = "online-house",
  ExpertHouse = "expert-house",
  SmartCare = "smart-care",
  Profile = "profile",
  Estimate = "estimate",
  Question = "question",
}

export enum LikeEntityType {
  Notification = "notification",
  ExpertHouse = "expert_house",
  OnlineHouse = "online_house",
  Portfolio = "portfolio",
  SmartStore = "smart_store",
  User = "user",
}

export enum WishEntityType {
  ExpertHouse = "expert_house",
  OnlineHouse = "online_house",
  SmartStore = "smart_store",
  Product = "product",
}

export enum CommonConstantType {
  Color = "color",
  HouseStyle = "house_style",
  AreaSpace = "area_space",
  FamilyType = "family_type",
  QuestionType = "question_type",
  CertificationType = "certification_type",
  AgeRange = "age_range",
  HouseType = "house_type",
  InteriorFeeling = "interior_feeling",
}
