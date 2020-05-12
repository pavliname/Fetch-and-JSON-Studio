window.addEventListener("load", function(){

  let json = [];
  fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) {
     response.json().then(function(json) {

       //sort astronauts by HoursInSpace desc
       let toBeSortedHoursInSpace=[];
       let sortedHoursInSpace=[]
       for (let i=0;i<json.length;i++){
         toBeSortedHoursInSpace.push(json[i].hoursInSpace);
         sortedHoursInSpace.push(json[i].hoursInSpace);
       }
       sortedHoursInSpace.sort().reverse();
       let indexArray=[];
       let item;
       for (let i=0;i<json.length;i++){
         item=toBeSortedHoursInSpace.indexOf(sortedHoursInSpace[i]);
         indexArray.push(item);
       }

       //add astronaut's count
        let count = document.getElementById("count");
        count.innerHTML=`Astronauts: ${json.length}`;

      //add innerHTML + green active class
        let container = document.getElementById("container");
        let index = 0;
        let active;
        let green=0;
        let innerHTML=[];
        for (let index=0;index<json.length;index++){
          if (json[index].active ===true){
          innerHTML[index]=`
           <div class="astronaut">
              <div class="bio">
                 <h3>${json[index].firstName} ${json[index].lastName}</h3>
                 <ul>
                    <li>Hours in space: ${json[index].hoursInSpace}</li>
                    <li class="green">Active: ${json[index].active}</li>
                    <li>Skills: ${json[index].skills}</li>
                 </ul>
              </div>
              <img class="avatar" src=${json[index].picture}>
           </div>
         `;
       } else {
         innerHTML[index]=`
          <div class="astronaut">
             <div class="bio">
                <h3>${json[index].firstName} ${json[index].lastName}</h3>
                <ul>
                   <li>Hours in space: ${json[index].hoursInSpace}</li>
                   <li>Active: ${json[index].active}</li>
                   <li>Skills: ${json[index].skills}</li>
                </ul>
             </div>
             <img class="avatar" src=${json[index].picture}>
          </div>
        `;
       }
       }

       //combine sorted innerHTML
       let innerHTMLTotal="";
       for (let k=0;k<indexArray.length;k++){
         innerHTMLTotal+=innerHTML[indexArray[k]];
       }
       container.innerHTML=innerHTMLTotal;
     });
   });
});
