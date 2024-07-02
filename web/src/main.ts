import "./styles/main.css"

const form = document.getElementById("generatorForm");

const changeGenerator = ()=> {
  const select = document.getElementById("generatorSelect");
  if(select){
    console.log("here")
    window.location.href = `/game.html?generator=${(select as any).value}` 
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  changeGenerator();
});