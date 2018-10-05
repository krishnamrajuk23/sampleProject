import {Injectable} from '@angular/core';

@Injectable({
  providedIn: "root"
})

export class UtilService{
  fileData;
  setFileData(fileObject){
    this.fileData = fileObject;
  }
  dataURLtoFile(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], this.fileData.name, {type:mime});
  }


}
