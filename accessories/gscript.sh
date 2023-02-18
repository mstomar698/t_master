#  This script will automate everything based on default setting
echo "git automation script"
echo 'OR you can just commit by pressing "c"'

read -p "Do you have repo initiatlised? [y/n] || [c]: " input

if [ "$input" == "y" ]; then
  echo "Proceeding with the script."
  git add .
  read -p "Please enter your commit: " commit
  git commit -m "$commit"
#   read -p "Please enter branch to commit: " branch
#   git push -u origin $master
elif [ "$input" == "c" ]; then
  echo "commiting to current branch"
  git add .
  read -p "Please enter your commit: " commit
  git commit -m "$commit"
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