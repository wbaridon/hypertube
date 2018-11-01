# Hyptertube

## Obtenir la version v11.0.0 de Node
Mise a jour de Brew <br>
`rm -rf $HOME/.brew && git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew && export PATH=$HOME/.brew/bin:$PATH && brew update && echo "export PATH=$HOME/.brew/bin:$PATH" >> ~/.zshrc`

Installation de node <br>
`brew install node` <br><br>
Pour check la version il suffira de faire `node -v` et `npm -v`

## Installation des dependances
// Attention bug sur l'install de mongo je cherche comment faire
Faire d'abord un `npm i` dans le repertoire client et api <br>
Si ce n'est pas dèjà fait installer mongodb via `brew install mongodb` <br>
Pour que la db start automatiquement au login `brew services start mongodb` <br>
Puis comme pour mysql on lance `mongo` pour y acceder sur le port 27017 (Mdp? a suivre...) <br>

