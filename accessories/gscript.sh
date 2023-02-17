echo "git automation script"
#  This script will automate everything based on default setting
read -p "Do you have repo initiatlised? [y/n]: " input

if [ "$input" == "y" ]; then
  echo "Proceeding with the script."
  git add .
  read -p "Please enter your commit: " commit
  git commit -m "$commit"
  read -p "Please enter branch to commit: " branch
  git push -u origin $master
else
  echo "Initializing Repo."
  git init
read -p "Please enter your repository address: " remote
  git remote add origin $remote
  git add .
  read -p "Please enter your commit: " commit
  git commit -m "$commit"
  git push --set-upstream origin master
fi