import { Component} from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk'

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();


@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent  {
public meetConfig:any;
public signature:any;
public ZoomMtg:any;



  constructor() { 
this.setCongf(8405316574);//here goes your meeting id

  }
  setCongf(val){
    this.meetConfig={
      apikey:'',//
      apisecret:'',
      meetingNumber:val,
      userName:'',
      passWord:'',
      leaveUrl:'',
      role:0,
   };
   this.signature =ZoomMtg.generateSignature({
     meetingNumber:this.meetConfig.meetingNumber,
     apikey:this.meetConfig.apikey,
     apisecret:this.meetConfig.apisecret,
     role:this.meetConfig.role,
     success:res=>{
       console.log(res.result);
     }
   })
   ZoomMtg.init({
    showMeetingHeader: false,
    disableInvite: false,
    disableCallOut: true,
    disableRecord: true, //optional
    disableJoinAudio: true, //optional
    audioPanelAlwaysOpen: true, //optional
    showPureSharingContent: false, //optional
    isSupportAV: true, //optional,
    isSupportChat: true, //optional,
    isSupportQA: true, //optional,
    isSupportCC: true, //optional,
    screenShare: true, //optional,
    rwcBackup: '', //optional,
    videoDrag: true, //optional,
    sharingMode: 'both', //optional,
    videoHeader: true, //optional,
    isLockBottom: true, // optional,
    isSupportNonverbal: true, // optional,
    isShowJoiningErrorDialog: true, // optional,
    leaveUrl: '', // optional
    success:res =>{
      ZoomMtg.join({
        meetingNumber:this.meetConfig.meetingNumber,
     userName:this.meetConfig.userName,
     signature:this.signature,
     apikey:this.meetConfig.apikey,
     userEmail:'email@gmail.com',
     password:this.meetConfig.passWord,
     success:res=>{
       console.log('join meeting success');
     },
     error: res =>{
       console.log(res);
     }
     
      });
    },
    error: res =>{
      console.log(res);
    }
    
      

   })


   
  

  }

  
}
