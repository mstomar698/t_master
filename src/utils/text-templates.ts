// Chalk-templates to diplay in console

import chalkTemplate from 'chalk-template';

export const helpText = chalkTemplate`
{bold.cyan t_master} - cli to help other tools
  {bold USAGE}
    {bold $} {cyan tm_server} --help
    {bold $} {cyan tm_server} --version
    
  {bold OPTIONS}
    -h, --help                          Shows this help message
    -v, --version                       Displays the current version of serve
    
`;

