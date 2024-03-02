import Swal from "sweetalert2";
import { useStore } from "~/stores/common";
import SweetAlert from "~/ts/sweet-alert";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { Category } from "../interfaces/Category";
import { useModal } from "vue-final-modal";
import ModalImageVue from "~/components/ModalImage.vue";
import ModalPdfViewerVue from "~/components/ModalPdfViewer.vue";
import { SESSION_PARAMS } from "../constants";
import { api } from "../api";

export class Common {
  static isMobile = () => {
    const info = navigator.userAgent;
    var flag = false;

    if (
      info.indexOf("iPhone") > -1 ||
      info.indexOf("Android") > -1 ||
      info.indexOf("iPad") > -1 ||
      info.indexOf("iPod") > -1
    ) {
      flag = true;
    }
    return flag;
  };
  static showSuccessToast = (p_message: string) => {
    useToast().success(p_message);
  };

  static showErrorToast = (p_message: string) => {
    useToast().error(p_message);
  };

  static showInfoToast = (p_message: string) => {
    useToast().info(p_message);
  };

  static isValid = (p_str: string) => {
    return p_str != null && p_str != undefined && p_str.length > 0;
  };

  static formatPhoneNumber = (p_number: string) => {
    return (
      p_number.slice(0, 3) +
      "-" +
      p_number.slice(3, 7) +
      "-" +
      p_number.slice(7)
    );
  };

  static getYoutubeIdFromURL = (url: any) => {
    if (url.includes("https://youtube.com/shorts/")) {
      return url
        .replace("https://youtube.com/shorts/", "")
        .replace("?feature=share", "");
    }
    if (url.includes("https://www.youtube.com/shorts/")) {
      return url
        .replace("https://www.youtube.com/shorts/", "")
        .replace("?feature=share", "");
    }

    var youtubeId: any;
    url = url
      .replace(/(>|<)/gi, "")
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      youtubeId = url[2].split(/[^0-9a-z_\-]/i);
      youtubeId = youtubeId[0];
    } else {
      youtubeId = url;
    }

    return youtubeId;
  };

  static showAlert = (
    p_content?: string,
    p_callback?: Function,
    p_title?: string
  ) => {
    Swal.fire({
      title: p_title,
      html: p_content,
      iconHtml: "",
      showConfirmButton: true,
      confirmButtonText: "확인",
      reverseButtons: true,
    }).then((result) => {
      p_callback?.();
    });
  };

  static getCurLargeCategory = (
    p_categoryList: Category[],
    p_selectedCategory: Category
  ) => {
    if (p_selectedCategory.depth == 2) {
      for (var i = 0; i < p_categoryList?.length; i++) {
        const depth0 = p_categoryList[i];
        for (var j = 0; j < depth0.children.length; j++) {
          const depth1 = depth0.children[j];
          const found = depth1.children.find(
            (depth2) => depth2.id == p_selectedCategory.id
          );
          if (found) {
            return depth0;
          }
        }
      }
      return null;
    } else if (p_selectedCategory.depth == 1) {
      for (var i = 0; i < p_categoryList?.length; i++) {
        const depth0 = p_categoryList[i];
        const found = depth0.children.find(
          (depth1) => depth1.id == p_selectedCategory.id
        );
        if (found) {
          return depth0;
        }
      }
      return null;
    } else {
      return p_selectedCategory;
    }
  };

  static getCurMediumCategory = (
    p_categoryList: Category[],
    p_selectedCategory: Category
  ) => {
    if (p_selectedCategory.depth == 2) {
      for (var i = 0; i < p_categoryList?.length; i++) {
        const depth0 = p_categoryList[i];
        for (var j = 0; j < depth0.children.length; j++) {
          const depth1 = depth0.children[j];
          const found = depth1.children.find(
            (depth2) => depth2.id == p_selectedCategory.id
          );
          if (found) {
            return depth1;
          }
        }
      }
      return null;
    } else if (p_selectedCategory.depth == 1) {
      return p_selectedCategory;
    } else {
      return null;
    }
  };

  static getThumbnailUrl = (p_url: string) => {
    return (
      p_url?.substring(0, p_url.lastIndexOf(".")) +
      "_thumb" +
      p_url?.substring(p_url.lastIndexOf("."))
    );
  };

  static getYoutubeUrl = (p_id: string, mute: boolean = false, autoplay: boolean = false, controls: number = 1) => {
    return `https://www.youtube.com/embed/${p_id}?&autoplay=${autoplay}&mute=${mute}&loop=1&rel=0&showinfo=0&controls=${controls}&color=white&iv_load_policy=3&playlist=${p_id}`;
  };

  static checkLogin = (p_callback: Function) => {
    const store = useStore();
    if (store.isLoggedIn) {
      p_callback();
    } else {
      Swal.fire({
        title: "",
        html: `<p class="mt-[40px]">로그인이 필요한 기능입니다. 로그인후 진행하시겠습니까?</p>`,
        iconHtml: "",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: `아니오`,
        confirmButtonText: "로그인하러 가기",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigateTo("/login");
        } else {
        }
      });
    }
  };

  static onShowPreview = (p_url: string) => {
    const store = useStore();
    if (p_url.includes(".jpg") || p_url.includes(".png")) {
      const m = useModal({
        component: ModalImageVue,
        attrs: {
          title: "",
          onConfirm() {
            store.setCurModalIndicator(null)
        m.close();
          },
        },
        slots: {
          default: `<img src="${p_url}" class="w-full max-w-[360px] md:max-w-[726px]" />`,
        },
      });
        store.setCurModalIndicator(m)
  m.open();
      return;
    }
    const m = useModal({
      component: ModalPdfViewerVue,
      attrs: {
        onConfirm() {
          store.setCurModalIndicator(null)
        m.close();
        },
        pdfUrl: p_url,
      },
      slots: {
        default: ``,
      },
    });
      store.setCurModalIndicator(m)
  m.open();
  };

  static getProfile = async () => {
    const store = useStore();
    const res = await api.get("/auth/user/profile");
    if (res.success) {
      sessionStorage.setItem(
        SESSION_PARAMS.PROFILE_INFO,
        JSON.stringify(res.data)
      );
      store.setProfileInfo(res.data);
      store.setIsLoggedIn(true);
    } else {
      store.setIsLoggedIn(false);
    }
  };

  static isBusinessMember = () => {
    const store = useStore();
    return store.profileInfo?.account_type == "business";
  };
}
