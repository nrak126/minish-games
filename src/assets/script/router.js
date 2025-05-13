// router.js
const routes = {
  "#/intro": IntroComponent,
  "#/profile": ProfileComponent,
  "#/select": GameSelectComponent,
  "#/game-janken": GameJankenComponent,
  "#/game-roulette": GameRouletteComponent,
};

export function handleRouting() {
  const view = routes[location.hash] || IntroComponent;
  document.getElementById("app").innerHTML = view();
}