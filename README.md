# Template Master

- A very simple CLI tool to help in your daily work.
- It is written in TypeScript and uses shelljs and process.argv to execute commands.
- It allows any type of command to be parsed and later it is evaluated and executed as per content, making it kind off smart.

> ###### NOTE: but it totally hard coded so many cases may not work depending on language please check help tp see if way writing is true or not.

<br>

### To run locally:

```powershell
# Clone the repo
git clone https://github.com/mstomar698/t_master.git
# Go to the directory
cd t_master
# Install dependencies
npm install
# Run the tool
npm run dev
# Build the tool
npm run build
```

### To use the tool:

```powershell
# Install the tool globally
npm install -g t_master
# Run the tool
t_master
# for help
t_master --help # or t_master -h
# Uninstall the tool
npm uninstall -g t_master
```

### To see more about our scripts visit

> visit our [website](https://t-master.vercel.app) or Leave a star ⭐

### Comamnds Possible for now are:

```powershell
t_master - CLI tool to help other tools
  USAGE
    $ t_master --help
    $ t_master --version
    $ t_master --git
    $ t_master --reactjs
    $ t_master --nextjs
    $ t_master --mern
    $ t_master --webpack
    $ t_master --tailwind
    $ t_master --string --help

  OPTIONS
    -h, --help                          Shows this help message
    -v, --version                       Shows the version of the tool
    -g, --git                           All the git related commands
    -r, --reactjs                       Creates reactjs project
    -n, --nextjs                        Creates Nextjs project
    -m, --mern                          Creates MERN project
    -w, --webpack                       Creates webpack project
    -t, --tailwind                      Initiates and setup tailwindcss
    -sh, --string --help                Shows all smart string commands


 INFO  Gracefully shutting down. Please wait...
```

### Smart String Commands:

```powershell
t_master - CLI tool to help other tools

  USAGE:
    $ t_master --string --help

  OPTIONS:
    -sh, --string --help           To show smart string related help

  Description:
  ➡️  smart string works with any passed as arguments.

  ➡️  t_master will check string and tell which tool or command you are looking for.

  ➡️  string system works on various keyword to look for commmands to execute.

  ➡️  Example:
                      🚀  t_master "help me with Git"
                      🚀  t_master "coMmit all my changes"
                      🚀  t_master "make my react projEct with tailwind"
                      🚀  t_master "create nextjs project"

  ➡️  KeyWords:
          "git" "create" "nextjs" "tailwind" "reactjs" "mern"
      "webpack" "help" "version" "commit" "push" "pull" "add" ⚙️...⚙️

 INFO  Gracefully shutting down. Please wait...
```

### Example Images:

![help](/accessories/images/-h.png)
![string-help](/accessories/images/string-help.png)
![git](/accessories/images/git.png)
![nextjs](/accessories/images/-n.png)
![reactjs](/accessories/images/-r-t.png)
![webpack](/accessories/images/-w.png)
