import { Component, OnInit } from '@angular/core';
import { ref as ref_database, onValue, set } from "firebase/database";
import { database } from '../FirebaseConfig';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  projects : Array<any> = [
    {
      title : 'Hiiii'
    }
  ];
  constructor() { }

  ngOnInit() {
    this.getProjectsData()
  }

  onRefreshData (event) {
    this.getProjectsData().then((res)=>{
      setTimeout(() => event.target.complete(), 2000);
    })
  }

  async getProjectsData() {
    // Getting Project Data from firebase realtime database
    await onValue(ref_database(database, "Projects"), (snapshot) => {
      this.projects = snapshot.val();
      console.log(">>>> in list", this.projects);
    });
  }

  handleDelete(item) {
    const data = this.projects.filter((data)=> data.title != item.title)
    console.log('>> Data after deletetion',data)
    // Setting new data to firebase realtime
    set(ref_database(database, "Projects"), data);
  }

}
