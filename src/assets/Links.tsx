export const Links = (pizza: string) => {
  switch (pizza) {
    case "4fromages.jpg":
      return require("./pizza/4fromages.jpg");
    case "campagnarde.jpg":
      return require("./pizza/campagnarde.jpg");
    case "chevre-miel.jpg":
      return require("./pizza/chevre-miel.jpg");
    case "chicken-bbq.jpg":
      return require("./pizza/chicken-bbq.jpg");
    case "hawaienne.jpg":
      return require("./pizza/hawaienne.jpg");
    case "margherita.jpg":
      return require("./pizza/margherita.jpg");
    case "nordique.jpg":
      return require("./pizza/nordique.jpg");
    case "orientale.jpg":
      return require("./pizza/orientale.jpg");
    case "pepperoni.jpg":
      return require("./pizza/pepperoni.jpg");
    case "reine.jpg":
      return require("./pizza/reine.jpg");
    case "texan-bbq.jpg":
      return require("./pizza/texan-bbq.jpg");
    case "vegetarienne.jpg":
      return require("./pizza/vegetarienne.jpg");
  }
};
