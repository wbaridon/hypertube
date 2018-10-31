# Hyptertube

## Obtenir la version v11.0.0 de Node
Mise a jour de Brew <br>
`rm -rf $HOME/.brew && git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew && export PATH=$HOME/.brew/bin:$PATH && brew update && echo "export PATH=$HOME/.brew/bin:$PATH" >> ~/.zshrc`

Installation de node <br>
`brew install node` <br><br>
Pour check la version il suffira de faire `node -v` et `npm -v`
