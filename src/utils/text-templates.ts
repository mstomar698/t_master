// Chalk-templates to diplay in console

import chalk from 'chalk';
import chalkTemplate from 'chalk-template';

const message = chalk.green('Welcome 🙌 to "Template Master"');

const helpText = chalkTemplate`
{bold.cyan t_master} - cli to help other tools
  {bold USAGE}
    {bold $} {cyan t_master} --help
    {bold $} {cyan t_master} --version
    
  {bold OPTIONS}
    -h, --help                          Shows this help message
    -v, --version                       Displays the current version of template-master
    
`;

export const template = { message, helpText };
