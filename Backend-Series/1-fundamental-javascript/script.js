// Fundamental of Javascript
// Arrays and Objects
//Function return
// async js coding

let arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
// foreach map filter find indexOf

// arr.forEach((value)=>{
//     console.log(value + "HELLO")
// })

// Map
let newArry = arr.map((value) => {
  return value + 0.1;
});
console.log(newArry);

//Filter
let newArry2 = newArry.filter((value) => {
  if (value <= 3) {
    return true;
  } else return false;
});
console.log(newArry2);

//find
let newArry3 = arr.find((value) => {
  if (value === 2) return value;
});

console.log(newArry3);

//indexOF
let arrIndex = arr.indexOf(12);
console.log(arrIndex);

//++++++++++++++++++ OBJECTS +++++++++++++++//

let obj = {
  name: "sagar",
  age: 22,
};
console.log(obj);

Object.freeze(obj); // freeze the change

obj.age = 25; //adding value on obj update

console.log(obj);

//=================== Functions ------------------//
function returnCheck() {
  return "HELLO WORLD";
}

let ansReturn = returnCheck();
console.log(ansReturn);


// ================== aynchronous ================//

async function abcd(){
   let blob = await fetch(`https://randomuser.me/api/`);
   let ans = await blob.json()
   console.log(ans.results[0].name);
}
abcd();


// --------------NOT Working---------------
/* const anyncLeaning = async() => {
  let blob = await fetch(`https://randomuser.me/api/`);
  let ans = await blob.json();
  console.log(ans.results[1].name)
 }
console.log(anyncLeaning); */