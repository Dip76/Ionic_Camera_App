import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ref as ref_database, onValue, set } from "firebase/database";
import {
  ref as ref_storage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "../FirebaseConfig";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  title = "ReactiveForms";
  reactiveForm: FormGroup;
  projectsList: any = [];
  loader: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      deployed: new FormControl(""),
      image: new FormControl(null, Validators.required),
      technologies: new FormControl(null, Validators.required),
      github: new FormControl(""),
      bgColor: new FormControl(null, Validators.required),
    });

    // Getting Project Data from firebase realtime database
    onValue(ref_database(database, "Projects"), (snapshot) => {
      this.projectsList = snapshot.val();
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]; // Here we use only the first file (single file)
    this.reactiveForm.patchValue({ image: file });
  }

  handleSubmit() {
    // set(ref(database, 'projects2'), {
    //   data : this.projectsList
    // }).then((res)=>{
    // });
    this.loader = true;
    if (this.reactiveForm.status == "INVALID") {
      alert("Invalid Form");
      this.loader = false;
    } else {
      let formData: any = this.reactiveForm.value;

      // Upload image to firebase storage
      const storageRef = ref_storage(
        storage,
        `project_image_${formData.title}`
      );
      uploadBytes(storageRef, formData.image)
        .then((snapshot) => {
          // Getting Image Url
          getDownloadURL(snapshot.ref)
            .then((res) => {
              formData.image = res;
              // setting data to firebase realtime database
              this.projectsList.unshift(formData);
              set(ref_database(database, "Projects"), this.projectsList);
              this.loader = false;
              this.reactiveForm.reset()
            })
            .catch((err) => {
              console.log(err);
              this.loader = false;
            });
        })
        .catch((err) => {
          console.log(err);
          this.loader = false;
        });
    }
  }
}
