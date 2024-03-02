export enum UserRole {
    CUSTOMER        = 'customer',
    COMPANY         = 'company'
}

export enum Gender {
    MALE            = 'M',           // 남
    FEMALE          = 'F'          // 여
}

export enum AgeRange {
    UNDER19         = "under19",        // 19세이하
    UNDER29         = "under29",        // 20 ~ 29세
    UNDER39         = "under39",        // 30 ~ 39세
    UNDER49         = "under49",        // 40 ~ 49세
    UP50            = 'up50'            // 50세 이상
}

export enum FavFloorColor {
    WHITE           = 'white',          // 화이트
    IVORY           = 'ivory',          // 아이보리 or 우드(오크)
    BROWN           = 'brown',          // 브라운
    GRAY            = 'gray',           // 그레이
    BLACK           = 'black',          // 블랙
    OTHER           = 'other'           // 기타
}

export enum HomeSize {
    SQUARE10        = 'square10',        // 10평대
    SQUARE20        = 'square20',        // 20평대
    SQUARE30        = 'square30',        // 30평대
    SQUARE40        = 'square40',        // 40평대 이상
}



export enum HomeStyle {
    STUDIO          = 'studio',         // 원룸 & 오피스텔
    APART           = 'apart',          // 아파트
    VILLA           = 'villa',          // 빌라
    ALONE           = 'alone',          // 단독주택
}

export enum FailyMember {
    SINGLE          = 'single',         // 싱글라이프
    COUPLE          = 'couple',         // 신손부부
    BABY            = 'baby',           // 아기와 함께
    STUDENT         = 'student',        // 취학 자녀와 함께
    ADULT           = 'adult',          // 성인 자녀와 함께
    PARENT          = 'parent',         // 부모와 함께
}

export enum FavInterioStyle {
    MINIMAL         = 'minimal',        // 미니멀 & 모던
    WHITE           = 'white',          // 화이트 우드
    NATURAL         = 'natural',        // 내츄럴
    CLASSIC         = 'classic',        // 클래식
    VINTAGE         = 'vintage',        // 빈티지/레트로
    MIDCENTER       = 'midcenter',      // 미드 센추리 모던
    OTHER           = 'other',          // 기타
}

export enum FavMood {
    WARM            = 'warm',           // 따뜻한
    ADVANCED        = 'advanced',       // 고급스러운
    REFINED         = 'refined',        // 세련된
    UNIQUE          = 'unique',         // 개성있는
    NORTH_EU        = 'north_eu',       // 북유럽
    OTHER           = 'other'           // 기타
}

export enum JoinReason {
    GETINFO         = 'getinfo',        // 마루 및 사공사례 정보를 얻기 위해.
    POINT           = 'point',          // 시공사례를 등록하여 포인트의 적립 및 사용을 위해
    AS_SERVICE      = 'as_service',     // 구정마루를 시공하였고 AS 서비스를 위하여
    OTHER           = 'other'           // 기타
}