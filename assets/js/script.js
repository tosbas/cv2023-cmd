const welcome = document.getElementById("welcome");
const shell = document.getElementById("shell");
const shellName = document.getElementById("shell-name");
const promptInput = document.getElementById("prompt1");
const shellCmd1 = document.getElementById("shell-cmd1");
const shellhost = [...document.getElementsByClassName("shell-host")];

const welcomeText =
  "Bienvenue sur mon CV interactif réalisé en pur Javascript, si vous êtes familier avec le système Linux vous n'aurez aucun problème pour naviguer, sinon pour afficher la liste des commandes taper help";
const arrayText = welcomeText.split(" ");
const arrayString = welcomeText.split("");
const NAME_SHELL = "tosbas shell 1.0.0";
const HOST = "tosbas";
const DOMAIN = "localhost";

const commandesListe = [
  "ls [-a]",
  "cat",
  "cd",
  "clear",
  "whoami",
];

const directories = [["Documents", "Downloads"], [".hidden"]];

//**** Affichage  ******/
const welcomeMessage = setInterval(() => {
  if (i != arrayString.length) {
    welcome.innerText += arrayString[i];
    if (arrayString[i] == " ") {
      welcome.innerHTML += "&nbsp";
    }
    i++;
  } else {
    clearInterval(welcomeMessage);
    termName();
    term(undefined, promptInput.id);
  }
}, 50);

const termName = () => {
  shellName.innerHTML = `${NAME_SHELL}`;
};

const term = (string, id) => {
  if (string !== undefined) {
    newMessageError(string);
    inputReadOnly(id);
    const newId = incInput(id);
    newShell(newId);
  } else {
    shellhost.forEach((element) => {
      element.innerHTML += `${HOST}@${DOMAIN}:~$`;
    });

    document.getElementById(promptInput.id).classList.remove("prompt-disabled");
  }
};

let i = 0;

const newShell = (newId) => {
  const newShellCmd = document.createElement("div");
  newShellCmd.classList.add("shell-cmd");
  shell.appendChild(newShellCmd);
  newShellCmd.innerHTML = `<p class="shell-host">${HOST}@${DOMAIN}:~$</p>`;

  const newInput = document.createElement("input");
  newShellCmd.appendChild(newInput);

  newInput.setAttribute("id", "prompt" + newId);
  newInput.setAttribute("type", "text");
  newInput.setAttribute("autofocus", "true");
  newInput.classList.add("prompt");

  EventInput("prompt" + newId);
};

const newMessageError = (string) => {
  const newMessageError = document.createElement("p");
  shell.appendChild(newMessageError);
  newMessageError.innerHTML = string;
};

//**** Commandes  ******/

const clear = (newId) => {
  shell.innerHTML = "";
  const newIdClear = incInput(newId);
  newShell(newIdClear);
};

const help = (shellCmd, newId) => {
  const shellContext = document.getElementById(shellCmd);
  const commande = document.createElement("div");

  shellContext.appendChild(commande);

  commandesListe.forEach((element) => {
    commande.innerHTML += `<p>${element}</p>`;
  });

  inputReadOnly(newId);
  const newIdShell = incInput(newId);
  newShell(newIdShell);
};

const ls = (shellCmd, newId, arg) => {
  const shellContext = document.getElementById(shellCmd);
  const commande = document.createElement("div");

  shellContext.appendChild(commande);

  if (arg === undefined) {
    directories[0].forEach((element) => {
      commande.innerHTML += `<p>${element}</p>`;
    });
  } else {
    switch (arg) {
      case "-a":
        directories[0].concat(directories[1]).forEach((element) => {
          commande.innerHTML += `<p>${element}</p>`;
        });
        break;
    }
  }

  inputReadOnly(newId);
  const newIdShell = incInput(newId);
  newShell(newIdShell);
};

const whoami = (shellCmd, newId) => {
  const shellContext = document.getElementById(shellCmd);
  const commande = document.createElement("div");

  shellContext.appendChild(commande);

  commande.innerHTML += `<p>${HOST}</p>`;

  inputReadOnly(newId);
  const newIdShell = incInput(newId);
  newShell(newIdShell);
};

//**** Functions  ******/

const inputReadOnly = (id) => {
  document.getElementById(id).removeAttribute("autofocus");
  document.getElementById(id).setAttribute("readonly", "true");
};

const incInput = (id) => {
  const getId = id.split("prompt");
  let newId = parseInt(getId[1]);
  newId++;
  return newId;
};

const EventInput = (newId) => {
  const promptInput = document.getElementById(newId);
  promptInput.addEventListener("keypress", (e) => {
    const value = promptInput.value;
    const valueArg = value.split(" ");

    if (e.key === "Enter") {
      switch (valueArg[0]) {
        case "ls":
          switch (valueArg[1]) {
            case "-a":
              ls(shell.id, newId, "-a");
              break;
            default:
              ls(shell.id, newId);
              break;
          }
          break;
        case "cat":
          console.log("cat");
          break;
        case "cd":
          console.log("cd");
          break;
        case "clear":
          clear(newId);
          break;
        case "help":
          help(shell.id, newId);
          break;
        case "whoami":
          whoami(shell.id, newId);
          break;
        default:
          term("Commande non reconnu", newId);
          break;
      }
    }
  });
};
EventInput(promptInput.id);
