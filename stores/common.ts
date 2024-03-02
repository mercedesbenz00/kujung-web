import { defineStore } from "pinia";
import { CommonConstantList } from "~/ts/interfaces/CommonConstantList";
import { Tag } from "~/ts/interfaces/Tag";
import { User } from "~/ts/interfaces/User";

export interface IMaruState {
  isLoggedIn: boolean;
  isLoading: boolean;
  isMenuPopup: boolean;
  isBrand: boolean;
  isProduct: boolean;
  isConstructionEx: boolean;
  isSmartService: boolean;
  isService: boolean;
  showNavbar: boolean;
  commonConstants: CommonConstantList[] | null;
  tagList: Tag[] | null;
  profileInfo: User | null;
  curModalIndicator: any;
}

export const useStore = defineStore("kujangmaru", {
  state: (): IMaruState => ({
    isLoggedIn: false,
    isLoading: false,
    isMenuPopup: false,
    isBrand: false,
    isProduct: false,
    isConstructionEx: false,
    isSmartService: false,
    isService: false,
    showNavbar: true,
    commonConstants: null,
    tagList: null,
    profileInfo: null,
    curModalIndicator: null,
  }),

  actions: {
    setIsLoggedIn(payload: boolean) {
      this.isLoggedIn = payload;
    },
    setIsLoading(payload: boolean) {
      this.isLoading = payload;
    },
    setIsMenuPopup(payload: boolean) {
      this.isMenuPopup = payload;
    },
    setIsBrand(payload: boolean) {
      this.isBrand = payload;
    },
    setIsProduct(payload: boolean) {
      this.isProduct = payload;
    },
    setIsConstructionEx(payload: boolean) {
      this.isConstructionEx = payload;
    },
    setIsSmartService(payload: boolean) {
      this.isSmartService = payload;
    },
    setIsService(payload: boolean) {
      this.isService = payload;
    },
    setshowNavbar(payload: boolean) {
      this.showNavbar = payload;
    },
    setCommonConstants(payload: CommonConstantList[]) {
      this.commonConstants = payload;
    },
    setTagList(payload: Tag[]) {
      this.tagList = payload;
    },
    setProfileInfo(payload: User | null) {
      this.profileInfo = payload;
    },
    setCurModalIndicator(payload: any) {
      this.curModalIndicator = payload;
    },
  },
});
