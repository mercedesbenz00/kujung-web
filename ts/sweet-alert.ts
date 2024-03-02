import Swal from 'sweetalert2'
export default class SweetAlert {
  constructor(private title:string = '', private html:string = '', private iconHtml: string = '') {
    Swal.fire({
      title: this.title,
      html: this.html,
      iconHtml: this.iconHtml,
      buttonsStyling: false,
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
      heightAuto: false,
    })
  }

  static openAlert(title?: string, html?: string, iconHtml?: string) {
    return new SweetAlert(title, html, iconHtml);
  }
}
