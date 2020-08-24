import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


import { ZoomMtg } from '@zoomus/websdk';

// const crypto = require('crypto')
import * as crypto from "crypto-js";


ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  signatureEndpoint = 'https://zoom-test-mtapia.herokuaoo.com'
  apiKey = 'Mil3kmPKTYOHg5APxMUYPw'
  meetingNumber = 71256584029
  //meetingNumber = 79415779097
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'Angular'
  userEmail = ''
  passWord = 'M3Dk09'
  //passWord = '27LKBa'

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {

  }

  ngOnInit() {

  }

  getSignature() {
    var req = {
      meetingNumber: this.meetingNumber,
	    role: this.role
    }
    const API_KEY = 'Mil3kmPKTYOHg5APxMUYPw'
    const API_SECRET = 'D5FBqEL67b1DvjMwPVFmeqXK7f1XCJbAibO8'
    const timestamp = new Date().getTime() - 30000
    const msg = ('' + API_KEY + this.meetingNumber + timestamp + this.role)
    //const hash = crypto.createHmac('sha256', API_SECRET).update(msg).digest('base64')
    var hash = crypto.HmacSHA256(msg, API_SECRET)
    hash = crypto.enc.Base64.stringify(hash)
    console.log(hash)
    // const signature = Buffer.from(`${API_KEY}.${this.meetingNumber}.${timestamp}.${this.role}.${hash}`).toString('base64')
    var flag = false;
    var signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetingNumber,
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      role: this.role
    
        //this.startMeeting(res.result)
    })
    //if (flag) {
      this.startMeeting(signature)
    //}

      //success: function (res) {
        //console.log(res.result);
        //this.signature = res.result;
        //this.apiKey = API_KEY;
        //this.this.startMeeting(res.result)
        //var joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
        //console.log(joinUrl);
        //window.open(joinUrl, "_blank");
      //},
    //});
    // TWlsM2ttUEtUWU9IZzVBUHhNVVlQdy43OTQxNTc3OTA5Ny4xNTk4Mjg0NDM4NzUzLjAuZUR4UnJiUGh6UUlsdmN1WWJsUHpSWVAvbCsyNE1PREJaWEhocm55UlpDaz0=
    //this.startMeeting(signature)
    /* this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    }) */
  }

  startMeeting(signature) {

    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: this.meetingNumber,
          userName: this.userName,
          apiKey: this.apiKey,
          userEmail: this.userEmail,
          passWord: this.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
