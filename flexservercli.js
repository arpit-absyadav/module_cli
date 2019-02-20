#!/usr/bin/env node
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('Flex Server Cli', {
        font: 'Bulbhead',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
};
const alertMessage = () => {
  console.log(
    chalk.green(
      figlet.textSync('-- Message --', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
  console.log(chalk.yellow('Warning : Please be carefull with your choice. '));
  console.log(chalk.white(' '));
  console.log(
    chalk.white('Your choice can fully overwrite the existing databse.')
  );
  console.log(chalk.white('This could create problem for your application.  '));
};
console.log(chalk.white(' '));

const askQuestions = () => {
  const questions = [
    {
      type: 'list',
      name: 'OPTION',
      message: `What kind of transition do you want?? ${chalk.yellow(
        'This will restore all the timeslot created already.'
      )} `,
      choices: ['Production ==> Local', 'Local ==> Production'],
      filter: function(val) {
        return val === 'Production ==> Local' ? 1 : 2;
      }
    }
  ];
  return inquirer.prompt(questions);
};
const askLocalOverwriteConfirmation = () => {
  alertMessage();
  const questions = [
    {
      type: 'list',
      name: 'FLAG',
      message: `Are you sure?? `,
      choices: ['Yes', 'No'],
      filter: function(val) {
        return val === 'Yes' ? true : false;
      }
    }
  ];
  return inquirer.prompt(questions);
};
const askProductionOverwriteConfirmation = () => {
  alertMessage();

  const questions = [
    {
      type: 'list',
      name: 'FLAG',
      message: `Are you sure?? `,
      choices: ['Yes', 'No'],
      filter: function(val) {
        return val === 'Yes' ? true : false;
      }
    }
  ];
  return inquirer.prompt(questions);
};

const production2Local = async () => {
  shell.echo(`${chalk.yellow(`Production to Local`)} : process start..`);
  shell.echo(`${chalk.yellow(`Establishing connection to mlab...`)} `);
  const { stdout, stderr, code } = await shell.exec(
    `mongodump -h ds121183.mlab.com:21183 -d service-db -u serviceAdmin -p service123  -o  .db/homeservice`
  );
  // if 1 then some error
  if (code == 1) {
    shell.echo(`${chalk.red('Something went wrong..')}`);
    shell.echo(
      `${chalk.white(
        `${chalk.yellow('Suggestion')} : Check internet connetion.`
      )}`
    );
    process.exit(0);
  }
  shell.echo(`${chalk.yellow(`Successfully restored data from [mlab]...`)} `);
  shell.echo(`${chalk.green(`wait...`)} `);
  shell.echo(
    `${chalk.yellow(
      `This will overwrite ${chalk.green('[homeservice]')} database completely`
    )}`
  );

  const answers = await askLocalOverwriteConfirmation();
  const { FLAG } = answers;
  if (!FLAG) {
    shell.echo('Closing processes..');
    process.exit(0);
  }
  shell.echo(
    `${chalk.yellow(
      `Creating database and storing data to  [homeservice]...`
    )} `
  );
  shell.exec(`mongorestore -d 'homeservice' .db/homeservice/service-db`);
};
const localToProduction = async () => {
  shell.echo(`${chalk.yellow(`Local to Production`)} : process start..`);
  shell.echo(`${chalk.yellow(`Scanning [homeservice]  ...`)} `);
  const { stdout, stderr, code } = await shell.exec(
    `mongodump -d homeservice  -o .db/localhomeservice`
  );
  // if 1 then some error
  if (code == 1) {
    shell.echo(`${chalk.red('Something went wrong..')}`);
    shell.echo(
      `${chalk.white(
        `${chalk.yellow('Suggestion')} : Check that ${chalk.white(
          'mongod'
        )} service started.`
      )}`
    );
    shell.echo('You can achive this using following command.');
    shell.echo('$ sudo service mongod start');
    process.exit(0);
  }
  shell.echo(
    `${chalk.yellow(`Successfully restored data from [homeservice]...`)} `
  );
  shell.echo(`${chalk.yellow(`Establishing connection to mlab...`)} `);

  shell.echo(`${chalk.green(`please wait...`)} `);
  shell.echo(
    `${chalk.yellow(
      `This will overwrite ${chalk.green('[mlab]')} database completely`
    )}`
  );
  const answers = await askProductionOverwriteConfirmation();
  const { FLAG } = answers;
  if (!FLAG) {
    shell.echo('Closing processes..');
    process.exit(0);
  }
  shell.echo(
    `${chalk.yellow(`Creating database and storing data to  [service-db]...`)} `
  );
  shell.exec(`mongorestore -d 'service-db' .db/localhomeservice/homeservice`);
};

const run = async () => {
  init();
  // ask questions
  // const answers = await askQuestions();
  await shell.exec(
    `git clone --depth=1  https://github.com/arpit-absyadav/____server-module.git .`
  );
  await shell.exec(` rm -rf .git`);
};

run();
