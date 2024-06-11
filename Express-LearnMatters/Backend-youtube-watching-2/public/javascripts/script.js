// ------------ToggelMode-------------//
{
    const addbtn = document.createElement('button') //write new btn
    addbtn.innerText="Toggel" //inside btn content
    pageBody = document.querySelector('body'); //selecting where want to attach
    pageBody.prepend(addbtn) // adding location
    addbtn.classList.add("toggel") //adding class
    addbtn.setAttribute('id', 'mode') //adding id

    // ---------------Adding addEventListener-------------//

    let currentMode = 'light'
    let selectTheBody = document.querySelector('body');

    addbtn.addEventListener('click',()=>{
        if(currentMode === 'light'){
            currentMode = 'dark'
            selectTheBody.classList.add('dark')
            selectTheBody.classList.remove('light')
        }else{
            currentMode = 'light'
            selectTheBody.classList.add('light')
            selectTheBody.classList.remove('dark')
        }
        console.log(currentMode);
    })
}

/* 
You Need to create style.css & you need to create two class .dark and .light and apply styles.

         .dark{
             background: black;
             color: white;
         }
         .light{
             background: white;
             color: black;
         } 

*/