document.getElementById("sign-in").addEventListener("click",function(){
  console.log("parco tumi");

  // take user name
  const username=document.getElementById("user-name");
  const name=username.value;
  console.log(name);

  // take password
  const enterPassWord = document.getElementById("enter-password");
  const password = enterPassWord.value;
  console.log(password);


  // user&pass ck

  if(name=="admin" && password=="admin123"){
    alert("loging success")
    window.location.assign("home.html");
  }
  else{
    alert("try again")
    return;
  }
  
  
  

 });