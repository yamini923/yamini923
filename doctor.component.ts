import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.styl']
})
export class DoctorComponent implements OnInit {


doctorForm:any;
doctors:any;
//selectedFile:any;
//url:any;
//msg="";
  constructor(private fb:FormBuilder,private ds:DoctorService,private httpClient: HttpClient) { 

  

   this.doctorForm=this.fb.group({
  doctorId:['D01'],
  doctorFirstName:['YAMINI'],
  doctorLastName:['SESHAKALA'],
  doctorPhoneNumber:['9636325632'],
  doctorEmail:['YAMINI@GMAIL.COM'],
  qualification:['MBBS'],
 profilePicture:[],
});
  }
   selectedFile:any;
   event:any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

public  onFileChanged(event:any) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
  };
}
 // This part is for uploading
 onUpload() {


  const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);


  this.httpClient.post('http://localhost:8080/doctor/', uploadData)
  .subscribe(
               res => {console.log(res);
                       this.receivedImageData = res;
                       this.base64Data = this.receivedImageData.pic;
                       this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
               err => console.log('Error Occured duringng saving: ' + err)
            );


 }











/*selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}*/
	

get form() {
  return this.doctorForm.controls;
}
  ngOnInit(): void {
  this.getAllDoctors();
  }
  

    
  

  

 
  
getAllDoctors() {
    this.ds.getAllDoctors().subscribe((data:any) => {
      console.log(data);
      this.doctors = data;
    });
  }

 fnSelect(doctorId:any) {
    this.ds.findDoctorById(doctorId).subscribe((data:any) => {
      console.log(data);
       alert(JSON.stringify(data))
     this.doctorForm.patchValue(data);
    });
  }


  fnFind() {
   var doctorId = this.doctorForm.controls.doctorId.value;
    this.fnSelect(doctorId);
  }


  fnAdd() {
    /*var doctor = this.doctorForm.value;   
    this.ds.addDoctor(doctor).subscribe((data:any) => {
      console.log(data);
      this.getAllDoctors();
    });*/




    var formData=new FormData();
    formData.append('doctorId',this.doctorForm.controls.doctorId.value);
    formData.append('doctorFirstName',this.doctorForm.controls.doctorFirstName.value);
formData.append('doctorLastName',this.doctorForm.controls.doctorLastName.value);
formData.append('doctorPhoneNumber',this.doctorForm.controls.doctorPhoneNumber.value);
formData.append('doctorEmail',this.doctorForm.controls.doctorEmail.value);
formData.append('profilePicture',this.doctorForm.controls.profilePicture.value);


  }
  fnModify() {
    var doctor= this.doctorForm.value;
    this.ds.modifyDoctor(doctor).subscribe((data:any) => {
      console.log(data);
      this.getAllDoctors();
    });
  }
  fnDelete() {
    var doctorId = this.doctorForm.controls.doctorId.value;
    this.ds.deleteDoctor(doctorId).subscribe((data:any) => {
      console.log(data);
      this.getAllDoctors();
    });


}
}

