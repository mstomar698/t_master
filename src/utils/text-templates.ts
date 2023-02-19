// Chalk-templates to diplay in console

import chalk from 'chalk';
import chalkTemplate from 'chalk-template';

const message = chalk.red('Welcome 👋 to "Template Master"');

const helpText = chalkTemplate`
{bold.red t_master} - CLI tool to help other tools
  {bold USAGE}
    {bold $} {red t_master} --help
    {bold $} {red t_master} --version
    {bold $} {cyan t_master} --git
    {bold $} {red t_master} --reactjs
    {bold $} {red t_master} --nextjs
    {bold $} {red t_master} --mern
    {bold $} {red t_master} --webpack
    {bold $} {red t_master} --tailwind
    {bold $} {yellow t_master} --string --help
    
  {bold OPTIONS}
    -h, --help                          Shows this help message
    -v, --version                       Shows the version of the tool 
    -g, --git                           All the git related commands 
    -r, --reactjs                       Creates reactjs project
    -n, --nextjs                        Creates Nextjs project
    -m, --mern                          Creates MERN project
    -w, --webpack                       Creates webpack project
    -t, --tailwind                      Initiates and setup tailwindcss
    -sh, --string --help                Shows all smart string commands
    
`;

const stringHelpText = chalkTemplate`
{bold.red t_master} - CLI tool to help other tools

  {bold USAGE:}
    {bold $} {yellow t_master} --string --help
    
  {bold OPTIONS:}
    -sh, --string --help           To show smart string related help 
    
  {bold Description:}
  {bold ➡️} {bold } smart string works with any passed as arguments.

  {bold ➡️} {bold } t_master will check string and tell which tool or command you are looking for.  
  
  {bold ➡️} {bold } string system works on various keyword to look for commmands to execute.

  {bold ➡️} {bold } {bold.red Example:}
                      {bold 🚀} {bold } t_master "help me with Git"
                      {bold 🚀} {bold } t_master "coMmit all my changes"
                      {bold 🚀} {bold } t_master "make my react projEct with tailwind"
                      {bold 🚀} {bold } t_master "create nextjs project" 

{bold ➡️} {bold } {bold.red KeyWords:}
          "git" "create" "nextjs" "tailwind" "reactjs" "mern" 
      "webpack" "help" "version" "commit" "push" "pull" "add" ⚙️...⚙️

  

  
    
`;

export const template = { message, helpText, stringHelpText };
